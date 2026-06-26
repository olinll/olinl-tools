<script setup lang="ts">
/**
 * CardListPreview — MDC ::card-list 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/CardList.vue
 * 将子列表项渲染为卡片网格
 */
</script>

<template>
  <div class="card-list-preview my-4 grid gap-3 sm:grid-cols-2">
    <slot />
  </div>
</template>

<style scoped>
/* Style direct child list items as cards */
:deep(> ul) {
  list-style: none;
  padding: 0;
  margin: 0;
  display: contents;
}
:deep(> ul > li) {
  border: 1px solid hsl(var(--border) / 0.6);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  background: hsl(var(--card));
  transition: border-color 0.15s, box-shadow 0.15s;
}
:deep(> ul > li:hover) {
  border-color: hsl(var(--primary) / 0.3);
  box-shadow: 0 1px 3px hsl(var(--foreground) / 0.05);
}
</style>
