<script setup lang="ts">
/**
 * TipPreview — MDC :tip[text]{tip="tooltip" copy} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Tip.vue
 */
const props = withDefaults(
  defineProps<{
    text?: string
    tip?: string
    icon?: string
    copy?: boolean
  }>(),
  {
    copy: false,
  },
)

const copied = ref(false)

async function handleCopy() {
  if (!props.copy) return
  try {
    await navigator.clipboard.writeText(props.text || '')
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Ignore
  }
}
</script>

<template>
  <span
    class="relative inline cursor-pointer border-b border-dashed border-primary/50 text-foreground/80 transition-colors hover:text-foreground"
    :title="tip || undefined"
    @click="handleCopy"
  >
    <slot>{{ text }}</slot>
    <span
      v-if="copied"
      class="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background whitespace-nowrap"
    >
      已复制
    </span>
  </span>
</template>
