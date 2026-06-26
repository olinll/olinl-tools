<script setup lang="ts">
/**
 * QuotePreview — MDC ::quote{icon="lucide:quote"} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Quote.vue
 */
withDefaults(
  defineProps<{
    icon?: string
  }>(),
  {
    icon: 'lucide:quote',
  },
)
</script>

<template>
  <blockquote class="quote-preview relative my-6 overflow-hidden rounded-lg border border-border/60 bg-card px-6 py-5">
    <div class="pointer-events-none absolute -right-2 -top-2 text-6xl text-primary/10">
      <Icon :name="icon" class="h-16 w-16" />
    </div>
    <div class="relative z-10 text-foreground/80">
      <slot />
    </div>
  </blockquote>
</template>
