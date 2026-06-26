<template>
  <div class="mdc-preview-panel h-full overflow-auto bg-background">
    <!-- Empty state -->
    <div
      v-if="!source.trim()"
      class="flex h-full items-center justify-center text-muted-foreground"
    >
      <div class="text-center px-4">
        <Icon name="lucide:pen-line" class="mx-auto mb-4 h-12 w-12 opacity-30" />
        <p class="text-sm">在编辑器中输入 MDC 内容，实时预览效果</p>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="m-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4"
    >
      <p class="mb-1 text-sm font-medium text-destructive">解析错误</p>
      <pre class="text-xs text-destructive/80 whitespace-pre-wrap">{{ error }}</pre>
    </div>

    <!-- Loading state -->
    <div
      v-else-if="loading"
      class="flex h-full items-center justify-center"
    >
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
    </div>

    <!-- Preview -->
    <div
      v-else-if="parsed"
      class="mdc-render-wrapper bg-background text-foreground"
    >
      <MDCRenderer
        :body="parsed.body"
        :data="parsed.data"
        :components="mdcComponents"
        tag="article"
        class="prose prose-neutral dark:prose-invert max-w-none px-6 py-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  source: string
}>()

const { parsed, error, loading, parse } = useMdcParser()

const mdcComponents = useMdcComponents()

// Parse on source change
watch(
  () => props.source,
  (newSource) => {
    parse(newSource)
  },
  { immediate: true },
)
</script>

<style scoped>
/* Code block styling — ensures visible boundary regardless of typography plugin */
.mdc-render-wrapper :deep(pre) {
  background: hsl(var(--muted) / 0.6);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 1.25rem 0;
}

.mdc-render-wrapper :deep(pre code) {
  background: transparent;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.7;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.mdc-render-wrapper :deep(code) {
  background: hsl(var(--muted) / 0.5);
  border-radius: 0.25rem;
  padding: 0.15rem 0.35rem;
  font-size: 0.85em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

/* List styling */
.mdc-render-wrapper :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}
.mdc-render-wrapper :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}
.mdc-render-wrapper :deep(ul ul) { list-style: circle; }
.mdc-render-wrapper :deep(ul ul ul) { list-style: square; }
.mdc-render-wrapper :deep(ol ol) { list-style: lower-alpha; }

.mdc-render-wrapper :deep(li) {
  margin: 0.25rem 0;
}

/* Blockquote styling */
.mdc-render-wrapper :deep(blockquote) {
  border-left: 3px solid hsl(var(--primary) / 0.3);
  padding-left: 1rem;
  margin: 1rem 0;
  color: hsl(var(--muted-foreground));
}

/* Table styling */
.mdc-render-wrapper :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.mdc-render-wrapper :deep(th),
.mdc-render-wrapper :deep(td) {
  border: 1px solid hsl(var(--border));
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.mdc-render-wrapper :deep(th) {
  background: hsl(var(--muted) / 0.5);
  font-weight: 600;
}

/* Headings styling */
.mdc-render-wrapper :deep(h1) { font-size: 1.75rem; font-weight: 700; margin: 2rem 0 1rem; }
.mdc-render-wrapper :deep(h2) { font-size: 1.5rem; font-weight: 600; margin: 1.75rem 0 0.75rem; }
.mdc-render-wrapper :deep(h3) { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }

/* Horizontal rule */
.mdc-render-wrapper :deep(hr) {
  border: none;
  border-top: 1px solid hsl(var(--border));
  margin: 2rem 0;
}
</style>
