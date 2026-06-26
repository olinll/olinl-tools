<script setup lang="ts">
/**
 * LinkBannerPreview — MDC ::link-banner 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/LinkBanner.vue
 */
withDefaults(
  defineProps<{
    banner?: string
    title?: string
    description?: string
    link?: string
    mirror?: string
  }>(),
  {},
)
</script>

<template>
  <a
    :href="link || '#'"
    target="_blank"
    rel="noopener"
    class="link-banner-preview my-4 block overflow-hidden rounded-lg border border-border/60 no-underline transition-all hover:border-primary/30 hover:shadow-md"
  >
    <div class="relative h-40 overflow-hidden bg-muted">
      <img v-if="banner" :src="banner" alt="" class="h-full w-full object-cover" />
      <div v-else class="flex h-full items-center justify-center">
        <Icon name="lucide:image" class="h-8 w-8 text-muted-foreground/40" />
      </div>
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div class="text-base font-semibold text-white">{{ title || link || 'Link Banner' }}</div>
        <div v-if="description" class="mt-0.5 text-sm text-white/70">{{ description }}</div>
      </div>
    </div>
  </a>
</template>
