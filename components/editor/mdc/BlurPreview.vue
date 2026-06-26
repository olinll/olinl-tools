<script setup lang="ts">
/**
 * BlurPreview — MDC :blur[hidden text] 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Blur.vue
 */
defineProps<{
  text?: string
}>()
</script>

<template>
  <span
    class="cursor-default transition-[filter] duration-200"
    style="filter: blur(4px)"
    title="鼠标悬停查看"
    @mouseenter="(e) => (e.target as HTMLElement).style.filter = 'blur(0)'"
    @mouseleave="(e) => (e.target as HTMLElement).style.filter = 'blur(4px)'"
  >
    <slot>{{ text }}</slot>
  </span>
</template>
