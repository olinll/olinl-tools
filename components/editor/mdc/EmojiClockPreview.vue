<script setup lang="ts">
/**
 * EmojiClockPreview — MDC :emoji-clock 预览组件
 * 简化版：展示时钟 emoji + 时间，无需定时器更新
 * 对应 blog-v3 components/content/EmojiClock.vue
 */
const props = withDefaults(
  defineProps<{
    datetime?: string
    rotate?: boolean
  }>(),
  {},
)

const displayTime = computed(() => {
  if (props.datetime) {
    const d = new Date(props.datetime)
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    return props.datetime
  }
  // Show current time
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
})
</script>

<template>
  <span class="inline-flex items-center gap-1 text-sm" :title="displayTime">
    <span class="text-base">{{ rotate ? '🕐' : '🕐' }}</span>
    <span class="text-xs text-muted-foreground">{{ displayTime }}</span>
  </span>
</template>
