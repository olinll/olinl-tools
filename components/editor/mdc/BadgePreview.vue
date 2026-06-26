<script setup lang="ts">
/**
 * BadgePreview — MDC :badge[text]{link="..." round} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Badge.vue
 */
defineProps<{
  img?: string
  text?: string
  link?: string
  round?: boolean
  square?: boolean
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/80 px-2.5 py-0.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted"
    :class="{
      'rounded-md': square,
      'rounded-full': round || !square,
    }"
  >
    <img
      v-if="img"
      :src="img"
      alt=""
      class="h-3.5 w-3.5 rounded-sm object-cover"
      @error="($event.target as HTMLImageElement).remove()"
    />
    <slot>
      <span>{{ text }}</span>
    </slot>
  </span>
</template>
