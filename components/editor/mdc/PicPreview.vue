<script setup lang="ts">
/**
 * PicPreview — MDC ::pic 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Pic.vue
 */
withDefaults(
  defineProps<{
    src?: string
    alt?: string
    caption?: string
    zoom?: boolean
    width?: string | number
    height?: string | number
  }>(),
  {
    zoom: true,
  },
)
</script>

<template>
  <figure class="pic-preview my-6 overflow-hidden rounded-lg border border-border/40">
    <div
      class="relative bg-muted/30"
      :class="{ 'cursor-zoom-in': zoom }"
    >
      <slot name="image">
        <img
          v-if="src"
          :src="src"
          :alt="alt || caption || ''"
          :width="width"
          :height="height"
          class="mx-auto max-h-[60vh] object-contain"
          loading="lazy"
        />
        <div
          v-else
          class="flex items-center justify-center py-16 text-muted-foreground"
        >
          <Icon name="lucide:image" class="mr-2 h-5 w-5" />
          <span class="text-sm">图片预览</span>
        </div>
      </slot>
    </div>
    <figcaption
      v-if="caption || $slots.caption"
      class="border-t border-border/40 bg-muted/20 px-4 py-2 text-center text-sm text-muted-foreground"
    >
      <slot name="caption">
        {{ caption }}
      </slot>
    </figcaption>
  </figure>
</template>
