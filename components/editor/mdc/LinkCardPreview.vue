<script setup lang="ts">
/**
 * LinkCardPreview — MDC ::link-card 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/LinkCard.vue
 */
withDefaults(
  defineProps<{
    title?: string
    description?: string
    link?: string
    icon?: string
    mirror?: string
    class?: string
  }>(),
  {},
)
</script>

<template>
  <a
    :href="link || '#'"
    target="_blank"
    rel="noopener"
    class="link-card-preview my-4 flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 no-underline transition-all hover:border-primary/30 hover:shadow-sm"
  >
    <div class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
      <img v-if="icon" :src="icon" alt="" class="h-full w-full object-cover" @error="($event.target as HTMLImageElement).style.display='none'" />
      <Icon v-else name="lucide:link" class="h-5 w-5 text-muted-foreground" />
    </div>
    <div class="min-w-0 flex-1">
      <div class="truncate text-sm font-medium text-foreground">{{ title || link || 'Link Card' }}</div>
      <div class="truncate text-xs text-muted-foreground">{{ description || '' }}</div>
    </div>
    <Icon name="lucide:external-link" class="h-4 w-4 shrink-0 text-muted-foreground/50" />
  </a>
</template>
