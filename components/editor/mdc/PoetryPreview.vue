<script setup lang="ts">
/**
 * PoetryPreview — MDC ::poetry 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Poetry.vue
 */
defineProps<{
  title?: string
  author?: string
  footer?: string
}>()
</script>

<template>
  <div class="poetry-preview my-6 flex flex-col items-center py-4 text-center">
    <div
      v-if="title"
      class="mb-2 text-lg font-bold text-foreground"
    >
      {{ title }}
    </div>
    <div
      v-if="author"
      class="mb-3 text-sm text-muted-foreground"
    >
      {{ author }}
    </div>
    <div class="max-w-lg leading-relaxed text-foreground/80">
      <slot />
    </div>
    <div
      v-if="footer"
      class="mt-3 text-xs text-muted-foreground"
    >
      {{ footer }}
    </div>
  </div>
</template>
