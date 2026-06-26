<script setup lang="ts">
/**
 * CopyPreview — MDC :copy{code="ls -la" lang="sh"} 预览组件
 * Tailwind 重写版，对应 blog-v3 components/content/Copy.vue
 */
const props = withDefaults(
  defineProps<{
    prompt?: string
    code?: string
    lang?: string
  }>(),
  {
    prompt: '$',
    code: '',
  },
)

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Ignore
  }
}
</script>

<template>
  <div class="copy-preview group my-2 flex items-center gap-2 rounded-md border border-border/40 bg-muted/50 px-3 py-1.5 font-mono text-sm">
    <span
      v-if="prompt"
      class="select-none text-muted-foreground"
    >
      {{ prompt }}
    </span>
    <code class="flex-1 text-foreground/80">{{ code }}</code>
    <button
      class="shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
      title="复制"
      @click="copyCode"
    >
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="h-3.5 w-3.5" />
    </button>
  </div>
</template>
