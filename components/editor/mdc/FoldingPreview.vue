<script setup lang="ts">
/**
 * FoldingPreview — MDC ::folding{title="展开"} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Folding.vue
 */
const props = withDefaults(
  defineProps<{
    title?: string
    open?: boolean
  }>(),
  {
    open: false,
  },
)

const isOpen = ref(props.open)
const toggleLabel = computed(() => (isOpen.value ? '收起' : '展开'))
</script>

<template>
  <details
    :open="isOpen"
    class="folding-preview my-4 rounded-lg border border-border/60"
    @toggle="isOpen = ($event.target as HTMLDetailsElement).open"
  >
    <summary
      class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted/50 select-none"
    >
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <span
        class="ml-2 shrink-0 text-xs text-muted-foreground transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      >
        {{ toggleLabel }}
        <Icon name="lucide:chevron-down" class="ml-1 inline h-3 w-3" />
      </span>
    </summary>
    <div class="border-t border-border/40 px-4 py-3 text-sm">
      <slot />
    </div>
  </details>
</template>
