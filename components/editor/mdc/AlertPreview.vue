<script setup lang="ts">
/**
 * AlertPreview — MDC ::alert{type="info"} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Alert.vue
 */
const props = withDefaults(
  defineProps<{
    type?: 'tip' | 'info' | 'question' | 'warning' | 'error'
    card?: boolean
    flat?: boolean
    icon?: string
    color?: string
    title?: string
    text?: string
  }>(),
  {
    type: 'info',
    card: true,
    flat: false,
  },
)

const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
  tip: { icon: 'lucide:lightbulb', color: '#16a34a', label: '提示' },
  info: { icon: 'lucide:info', color: 'hsl(var(--primary))', label: '信息' },
  question: { icon: 'lucide:help-circle', color: '#0ea5e9', label: '问题' },
  warning: { icon: 'lucide:alert-triangle', color: '#f59e0b', label: '警告' },
  error: { icon: 'lucide:circle-x', color: 'hsl(var(--destructive))', label: '错误' },
}

const config = computed(() => typeConfig[props.type])
const displayIcon = computed(() => props.icon || config.value.icon)
const displayColor = computed(() => props.color || config.value.color)
const isCard = computed(() => props.card && !props.flat)
</script>

<template>
  <div
    class="alert-preview my-4 rounded-lg border px-4 py-3 text-sm"
    :style="{
      borderColor: `${displayColor}30`,
      backgroundColor: isCard ? `hsl(var(--card))` : 'hsl(var(--muted))',
    }"
    :class="{ 'shadow-sm': isCard }"
  >
    <div
      class="mb-1 flex items-center gap-2 font-semibold"
      :style="{ color: displayColor }"
    >
      <Icon :name="displayIcon" class="h-4 w-4 shrink-0" />
      <slot name="title">{{ title || config.label }}</slot>
    </div>
    <div class="text-foreground/80 prose-p:m-0">
      <slot>
        <p>{{ text }}</p>
      </slot>
    </div>
  </div>
</template>
