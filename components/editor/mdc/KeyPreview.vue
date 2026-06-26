<script setup lang="ts">
/**
 * KeyPreview — MDC :key{code="Ctrl"} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Key.vue
 */
const props = withDefaults(
  defineProps<{
    code?: string
    text?: string
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean
    win?: boolean
    cmd?: boolean
    icon?: boolean
    prevent?: boolean
  }>(),
  {
    prevent: false,
  },
)

const displayText = computed(() => {
  if (props.text) return props.text
  // Modifier key display
  const parts: string[] = []
  if (props.ctrl) parts.push('Ctrl')
  if (props.shift) parts.push('Shift')
  if (props.alt) parts.push('Alt')
  if (props.meta || props.cmd || props.win) parts.push('Win')
  if (props.code) parts.push(props.code.toUpperCase())
  return parts.length > 0 ? parts.join(' + ') : ''
})
</script>

<template>
  <kbd
    class="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-[0.7rem] font-mono font-medium text-foreground/70 shadow-sm"
  >
    <slot>
      {{ displayText }}
    </slot>
  </kbd>
</template>
