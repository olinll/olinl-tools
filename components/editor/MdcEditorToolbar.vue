<template>
  <div
    class="flex items-center gap-1 border-b border-border/40 bg-background/95 px-3"
    :class="compact ? 'h-9' : 'h-10'"
  >
    <!-- Word / character count -->
    <span class="text-xs text-muted-foreground">
      {{ wordCount }} 词 · {{ charCount }} 字
    </span>

    <div class="flex-1" />

    <!-- Component quick reference popover -->
    <div class="relative">
      <TooltipProvider :delay-duration="300">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="h-7 w-7"
              @click="showPopover = !showPopover"
            >
              <Icon name="lucide:library" class="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>组件快速参考</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <!-- Popover -->
      <div
        v-if="showPopover"
        v-click-outside="() => showPopover = false"
        class="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border border-border bg-popover shadow-xl"
      >
        <div class="border-b border-border/40 px-3 py-2">
          <span class="text-xs font-medium">MDC 组件参考（点击插入）</span>
          <span class="text-[10px] text-muted-foreground ml-2">{{ registry.length }} 个</span>
        </div>
        <div class="max-h-72 overflow-auto">
          <div
            v-for="comp in registry"
            :key="comp.name"
            class="flex items-center gap-2 cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-muted/50"
            @click="insertAndClose(comp)"
          >
            <Badge :variant="comp.syntax === 'inline' ? 'secondary' : 'default'" class="shrink-0 text-[9px] px-1 py-0">
              {{ comp.syntax === 'inline' ? '行' : '块' }}
            </Badge>
            <span class="font-medium truncate">{{ comp.displayName }}</span>
            <code class="shrink-0 text-[10px] text-muted-foreground ml-auto">
              {{ comp.syntax === 'inline' ? ':' : '::' }}{{ comp.name }}
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Copy source -->
    <TooltipProvider :delay-duration="300">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7"
            @click="$emit('copy')"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>复制源码</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <!-- Clear -->
    <TooltipProvider :delay-duration="300">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="h-7 w-7"
            @click="$emit('clear')"
          >
            <Icon name="lucide:trash-2" class="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>清空内容</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  </div>
</template>

<script setup lang="ts">
import { mdcComponentRegistry, type MdcComponentMeta } from '~/types/mdc-components'
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    source: string
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

defineEmits<{
  clear: []
  copy: []
  insert: [template: string]
}>()

const registry = mdcComponentRegistry
const showPopover = ref(false)
const popoverRef = ref<HTMLDivElement>()

onClickOutside(popoverRef, () => {
  showPopover.value = false
})

function insertAndClose(comp: MdcComponentMeta) {
  showPopover.value = false
  // Generate a simple example
  const example = '\n' + (comp.syntax === 'inline'
    ? `:${comp.name}[内容]{${comp.props.filter(p => p.defaultValue !== undefined).map(p => `${p.name}="${p.defaultValue}"`).join(' ')}}`
    : comp.syntax === 'block-yaml'
      ? `::${comp.name}\n---\n${comp.props.map(p => `${p.name}: ${p.defaultValue || ''}`).join('\n')}\n---\n内容\n::`
      : `::${comp.name}{${comp.props.filter(p => p.defaultValue !== undefined || p.name === 'type').map(p => `${p.name}="${p.defaultValue || ''}"`).join(' ')}}\n内容\n::`) + '\n'
  emit('insert', example)
}

const wordCount = computed(() => {
  const text = props.source.trim()
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
})

const charCount = computed(() => props.source.length)
</script>
