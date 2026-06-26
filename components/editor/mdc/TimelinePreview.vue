<script setup lang="ts">
/**
 * TimelinePreview — MDC ::timeline 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Timeline.vue
 * 简化版：通过 slot 内容渲染时间线
 */
</script>

<template>
  <div class="timeline-preview relative my-6 border-l-2 border-border/60 pl-6">
    <slot />
  </div>
</template>

<style scoped>
:deep(> *) {
  position: relative;
  margin-bottom: 1rem;
}
:deep(> *::before) {
  content: '';
  position: absolute;
  left: -1.625rem;
  top: 0.5rem;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background: hsl(var(--primary) / 0.4);
  border: 2px solid hsl(var(--background));
}
</style>
