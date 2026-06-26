<template>
  <div class="mdc-editor-panel flex h-full min-h-0 flex-col">
    <div ref="editorContainer" class="flex-1 min-h-0 overflow-hidden" />

    <!-- Custom autocomplete dropdown -->
    <Teleport to="body">
      <div
        v-if="showCompletions && completions.length > 0"
        ref="completionMenu"
        class="fixed z-[9999] min-w-[240px] max-w-[360px] overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
        :style="{ left: menuPos.x + 'px', top: menuPos.y + 'px' }"
      >
        <div class="border-b border-border/40 px-3 py-1.5">
          <span class="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            {{ completions[0]?._isProp
              ? `属性 · ::${completions[0]._compName}`
              : `MDC 组件 — ${completions.length} 个匹配`
            }}
          </span>
        </div>
        <div class="max-h-[300px] overflow-auto py-1">
          <div
            v-for="(item, i) in completions"
            :key="item.name + (item._compName || '')"
            ref="completionItems"
            class="cursor-pointer px-3 py-2 transition-colors"
            :class="i === activeIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50'"
            @click="selectCompletion(item)"
            @mouseenter="activeIndex = i"
          >
            <!-- Prop value suggestion (Stage 3) -->
            <template v-if="item._isValue">
              <div class="flex items-center gap-2">
                <Badge variant="default" class="shrink-0 text-[9px] px-1 py-0">
                  取值
                </Badge>
                <code class="text-xs font-semibold text-emerald-500">{{ item.name }}</code>
              </div>
            </template>
            <!-- Prop name suggestion (Stage 2) -->
            <template v-else-if="item._isProp">
              <div class="flex items-center gap-2">
                <Badge :variant="item.syntax === 'inline' ? 'secondary' : 'default'" class="shrink-0 text-[9px] px-1 py-0">
                  {{ item.syntax === 'inline' ? 'bool' : '属性' }}
                </Badge>
                <code class="text-xs font-semibold text-primary">{{ item.displayName }}</code>
              </div>
              <p class="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                {{ item.description }}
              </p>
            </template>
            <!-- Component suggestion (Stage 1) -->
            <template v-else>
              <div class="flex items-center gap-2">
                <Badge :variant="item.syntax === 'inline' ? 'secondary' : 'default'" class="shrink-0 text-[9px] px-1 py-0">
                  {{ item.syntax === 'inline' ? '行内' : '块级' }}
                </Badge>
                <span class="font-mono text-xs font-semibold text-primary shrink-0">::{{ item.name }}</span>
                <span class="text-xs font-medium">{{ item.displayName }}</span>
              </div>
              <p class="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                {{ item.description }}
              </p>
              <p v-if="item.props.length > 0" class="mt-1 space-y-0.5">
                <span
                  v-for="p in item.props"
                  :key="p.name"
                  class="inline-flex items-center gap-1 mr-3 text-[10px] text-muted-foreground/70"
                >
                  <code class="text-[10px] font-medium">{{ p.name }}</code>
                  <span v-if="p.type === 'boolean'" class="text-[9px] text-muted-foreground/50">bool</span>
                  <span v-else-if="p.defaultValue" class="text-[9px] text-muted-foreground/50">={{ p.defaultValue }}</span>
                  <span
                    v-if="p.description?.includes('|')"
                    class="text-[9px] text-primary/60 font-mono"
                  >
                    {{ p.description }}
                  </span>
                </span>
              </p>
            </template>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { EditorView, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { mdcComponentRegistry, type MdcComponentMeta } from '~/types/mdc-components'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorContainer = ref<HTMLDivElement>()
let view: EditorView | null = null

// ---- Custom autocomplete state ----
const showCompletions = ref(false)
type CompletionItem = MdcComponentMeta & { _isProp?: boolean; _isValue?: boolean; _compName?: string }
const completions = ref<CompletionItem[]>([])
const activeIndex = ref(0)
const menuPos = ref({ x: 0, y: 0 })
const matchFrom = ref(0) // position in doc where :: starts

function getCompletions(prefix: string) {
  const p = prefix.toLowerCase()
  return p
    ? mdcComponentRegistry.filter((c) => c.name.startsWith(p))
    : [...mdcComponentRegistry]
}

// Get prop suggestions for a specific component when inside { ... }
function getPropCompletions(compName: string, partialProp: string) {
  const comp = mdcComponentRegistry.find(
    (c) => c.name === compName.toLowerCase(),
  )
  if (!comp || comp.props.length === 0) return []
  const p = partialProp.toLowerCase()
  return p
    ? comp.props.filter((prop) => prop.name.startsWith(p))
    : comp.props
}

function openCompletions(from: number, prefix: string) {
  const cmView = view
  if (!cmView) return
  completions.value = getCompletions(prefix)
  if (completions.value.length === 0) {
    showCompletions.value = false
    return
  }
  activeIndex.value = 0
  matchFrom.value = from

  const coords = cmView.coordsAtPos(from)
  if (coords) {
    menuPos.value = {
      x: coords.left,
      y: coords.bottom + 4,
    }
  }
  showCompletions.value = true
}

// Stage 2: prop suggestions inside ::name{ ... }
function openPropCompletions(compName: string, from: number, partialProp: string) {
  const cmView = view
  if (!cmView) return
  const comp = mdcComponentRegistry.find((c) => c.name === compName.toLowerCase())
  if (!comp || comp.props.length === 0) {
    showCompletions.value = false
    return
  }

  // Build pseudo "component" entries for each prop
  completions.value = getPropCompletions(compName, partialProp).map(
    (prop) =>
      ({
        name: prop.name,
        displayName: `${prop.name}${prop.type === 'boolean' ? '' : `="${prop.defaultValue || ''}"`}`,
        description: prop.description || `${prop.type} 类型`,
        syntax: prop.type === 'boolean' ? 'inline' : 'block-inline',
        props: [],
        slots: [],
        _isProp: true,
        _compName: compName,
      }) as MdcComponentMeta & { _isProp?: boolean; _compName?: string },
  )

  if (completions.value.length === 0) {
    showCompletions.value = false
    return
  }
  activeIndex.value = 0
  matchFrom.value = from

  const coords = cmView.coordsAtPos(from)
  if (coords) {
    menuPos.value = { x: coords.left, y: coords.bottom + 4 }
  }
  showCompletions.value = true
}

function closeCompletions() {
  showCompletions.value = false
  completions.value = []
}

function generateTemplate(meta: MdcComponentMeta): string {
  if (meta.syntax === 'inline') {
    const p = meta.props.length > 0
      ? `{${meta.props.map((p) => `${p.name}="${p.defaultValue || ''}"`).join(' ')}}`
      : ''
    return `:${meta.name}[内容]${p}`
  }
  if (meta.syntax === 'block-yaml') {
    const yamlProps = meta.props.map((p) => `${p.name}: ${p.defaultValue || ''}`).join('\n')
    return `::${meta.name}\n---\n${yamlProps}\n---\n内容\n::`
  }
  const bp = meta.props.length > 0
    ? `{${meta.props
        .filter((p) => p.defaultValue !== undefined || p.name === 'type')
        .map((p) => `${p.name}="${p.defaultValue || ''}"`)
        .join(' ')}}`
    : ''
  const slots = meta.slots
    ? meta.slots.filter((s) => s !== 'default').map((s) => `#${s}\n${s} 内容`).join('\n')
    : ''
  const body = slots ? `\n${slots}\n#default\n内容\n` : '\n内容\n'
  return `::${meta.name}${bp}${body}::`
}

function selectCompletion(meta: MdcComponentMeta & { _isProp?: boolean; _compName?: string }) {
  if (!view) return
  const to = view.state.selection.main.head

  // Handle prop value selection (Stage 3) — just insert the value text
  if (meta._isValue) {
    view.dispatch({
      changes: { from: matchFrom.value, to, insert: meta.name },
      selection: { anchor: matchFrom.value + meta.name.length },
    })
  } else if (meta._isProp && meta._compName) {
    // Stage 2: prop name selection
    const compDef = mdcComponentRegistry.find((c) => c.name === meta._compName)
    const propDef = compDef?.props.find((p) => p.name === meta.name)
    if (propDef) {
      let insert: string
      if (propDef.type === 'boolean') {
        insert = meta.name
      } else {
        insert = `${meta.name}="${propDef.defaultValue || ''}"`
      }
      view.dispatch({
        changes: { from: matchFrom.value, to, insert },
        selection: { anchor: matchFrom.value + insert.length },
      })
    }
  } else {
    // Component selection (Stage 1)
    const template = generateTemplate(meta)
    view.dispatch({
      changes: { from: matchFrom.value, to, insert: template },
      selection: { anchor: matchFrom.value + template.length },
    })
  }
  closeCompletions()
  view.focus()
}

// ---- CodeMirror theme (auto-adapts via shadcn CSS variables) ----
function createThemeExtension() {
  return EditorView.theme({
    '&': { height: '100%', fontSize: '14px', color: 'hsl(var(--foreground))', backgroundColor: 'hsl(var(--background))' },
    '.cm-scroller': { overflow: 'auto', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
    '.cm-content': { padding: '1rem' },
    '.cm-cursor': { borderLeftColor: 'hsl(var(--foreground))' },
    '.cm-activeLine': { backgroundColor: 'hsl(var(--foreground) / 0.06)' },
    '.cm-selectionBackground': { backgroundColor: 'hsl(var(--foreground) / 0.12)' },
    '.cm-selectionMatch': { backgroundColor: 'hsl(var(--primary) / 0.15)' },
    '.cm-gutters': { display: 'none' },
    '&.cm-focused .cm-cursor': { borderLeftColor: 'hsl(var(--foreground))' },
    '.cm-matchingBracket': { backgroundColor: 'hsl(var(--foreground) / 0.08)', outline: '1px solid hsl(var(--border))' },
  })
}

function createEditor() {
  if (!editorContainer.value || import.meta.server) return

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const newValue = update.state.doc.toString()
      if (newValue !== props.modelValue) {
        emit('update:modelValue', newValue)
      }
      // Stage 1: ::name — component name suggestions
      // Stage 2: ::name{...} — prop suggestions inside braces
      const pos = update.state.selection.main.head
      const line = update.state.doc.lineAt(pos)
      const cursorInLine = pos - line.from
      const textBefore = line.text.slice(0, cursorInLine)

      // Stage 3: prop value — inside prop="|" → suggest enum values
      const propValueMatch = textBefore.match(/::(\w+)\{[^}]*?\b(\w+)="([^"]*)$/)
      if (propValueMatch) {
        const compName = propValueMatch[1]
        const propName = propValueMatch[2]
        const partialValue = propValueMatch[3]
        const comp = mdcComponentRegistry.find((c) => c.name === compName.toLowerCase())
        const propDef = comp?.props.find((p) => p.name === propName)
        if (propDef?.description?.includes('|')) {
          const values = propDef.description.split('|').map((v) => v.trim())
          const filtered = partialValue
            ? values.filter((v) => v.startsWith(partialValue.toLowerCase()))
            : values
          if (filtered.length > 0) {
            completions.value = filtered.map((v) => ({
              name: v,
              displayName: v,
              description: propDef.description || `${propName} 可选值`,
              syntax: 'inline' as const,
              props: [],
              _isProp: true,
              _isValue: true,
              _compName: compName,
            }))
            activeIndex.value = 0
            matchFrom.value = pos - partialValue.length
            const coords = cmView.coordsAtPos(matchFrom.value)
            if (coords) {
              menuPos.value = { x: coords.left, y: coords.bottom + 4 }
            }
            showCompletions.value = true
          }
        }
        return
      }

      // Stage 2: detect if inside ::componentName{...props...}
      const propMatch = textBefore.match(/::(\w+)\{[^}]*$/)
      if (propMatch) {
        const compName = propMatch[1]
        // Find the last partial prop name after last space or at start after {
        const afterBrace = textBefore.slice(propMatch.index! + propMatch[0].length)
        const partialProp = afterBrace.trim()
        const from = pos - partialProp.length
        openPropCompletions(compName, from, partialProp)
        return
      }

      // Stage 1: ::name — component name suggestions
      const mdcMatch = textBefore.match(/::(\w*)$/)
      if (mdcMatch) {
        const prefix = mdcMatch[1] || ''
        const from = line.from + (mdcMatch.index || 0)
        openCompletions(from, prefix)
      } else {
        closeCompletions()
      }
    }
  })

  const state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      markdown({ base: markdownLanguage }),
      syntaxHighlighting(defaultHighlightStyle),
      EditorView.lineWrapping,
      highlightActiveLine(),
      updateListener,
      createThemeExtension(),
      // Handle keyboard events for custom dropdown
      EditorView.domEventHandlers({
        keydown(event) {
          if (!showCompletions.value || completions.value.length === 0) return false
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            activeIndex.value = Math.min(activeIndex.value + 1, completions.value.length - 1)
            return true
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            activeIndex.value = Math.max(activeIndex.value - 1, 0)
            return true
          }
          if (event.key === 'Enter') {
            event.preventDefault()
            selectCompletion(completions.value[activeIndex.value])
            return true
          }
          if (event.key === 'Escape') {
            event.preventDefault()
            closeCompletions()
            return true
          }
          return false
        },
      }),
    ],
  })

  view = new EditorView({ state, parent: editorContainer.value })
}

function destroyEditor() { view?.destroy(); view = null }

onMounted(() => nextTick(() => createEditor()))
onUnmounted(() => destroyEditor())

watch(() => props.modelValue, (newVal) => {
  if (view && newVal !== view.state.doc.toString()) {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: newVal } })
  }
})

// Close completions on click outside
if (import.meta.client) {
  document.addEventListener('click', (e) => {
    if (showCompletions.value && editorContainer.value && !editorContainer.value.contains(e.target as Node)) {
      closeCompletions()
    }
  })
}
</script>
