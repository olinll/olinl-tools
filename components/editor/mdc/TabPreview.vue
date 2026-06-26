<script setup lang="ts">
/**
 * TabPreview — MDC ::tab{:tabs='["Tab1","Tab2"]'} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Tab.vue
 */
const props = withDefaults(
  defineProps<{
    tabs?: string[]
    center?: boolean
    active?: number | string
  }>(),
  {
    tabs: () => [],
    center: false,
    active: 0,
  },
)

const activeIndex = ref(
  typeof props.active === 'string'
    ? Math.max(0, props.tabs.indexOf(props.active))
    : props.active,
)
</script>

<template>
  <div class="tab-preview my-4 rounded-lg border border-border/60">
    <div
      class="flex border-b border-border/40 bg-muted/30"
      :class="{ 'justify-center': center }"
    >
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="
          i === activeIndex
            ? 'border-b-2 border-primary bg-card text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        "
        @click="activeIndex = i"
      >
        {{ tab }}
      </button>
    </div>
    <div class="p-4">
      <slot :name="`tab${activeIndex + 1}`" />
    </div>
  </div>
</template>
