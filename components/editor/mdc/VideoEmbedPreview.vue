<script setup lang="ts">
/**
 * VideoEmbedPreview — MDC ::video-embed 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/VideoEmbed.vue
 */
withDefaults(
  defineProps<{
    type?: 'raw' | 'bilibili' | 'bilibili-nano' | 'youtube' | 'douyin' | 'douyin-wide' | 'tiktok'
    id?: string
    poster?: string
    autoplay?: boolean
    ratio?: string
    zoom?: boolean
  }>(),
  {
    type: 'raw',
    ratio: '16/9',
  },
)

const typeLabel: Record<string, string> = {
  raw: '本地视频',
  bilibili: 'B 站',
  'bilibili-nano': 'B 站 (Mini)',
  youtube: 'YouTube',
  douyin: '抖音',
  'douyin-wide': '抖音 (宽屏)',
  tiktok: 'TikTok',
}
</script>

<template>
  <div class="video-embed-preview my-4 overflow-hidden rounded-lg border border-border/60 bg-card">
    <div class="aspect-video flex items-center justify-center bg-muted">
      <div v-if="poster" class="relative h-full w-full">
        <img :src="poster" alt="" class="h-full w-full object-cover" />
        <div class="absolute inset-0 flex items-center justify-center bg-black/20">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Icon name="lucide:play" class="ml-0.5 h-6 w-6 text-foreground" />
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center gap-2 text-muted-foreground">
        <Icon name="lucide:video" class="h-10 w-10" />
        <span class="text-sm">{{ typeLabel[type] || type }}</span>
        <code class="text-xs text-muted-foreground/60">{{ id }}</code>
      </div>
    </div>
  </div>
</template>
