<template>
  <div class="flex h-[calc(100vh-3.5rem)] flex-col">
    <!-- Attribution banner -->
    <div class="shrink-0 border-b border-border bg-muted/50 px-4 py-2 text-center">
      <p class="text-sm leading-relaxed text-foreground/70">
        以下 MDC 组件适用于
        <a href="https://github.com/L33Z22L11/blog-v3" target="_blank" class="text-primary hover:underline underline-offset-2 font-medium">Clarity 主题</a>
        ，完整示例见
        <a href="https://blog.zhilu.site/previews/example" target="_blank" class="text-primary hover:underline underline-offset-2">组件参考页</a>
        ·
        <a href="https://blog.zhilu.site" target="_blank" class="text-muted-foreground hover:text-foreground hover:underline underline-offset-2">纸鹿</a>
        ·
        <a href="https://blog.olinl.com" target="_blank" class="text-muted-foreground hover:text-foreground hover:underline underline-offset-2">Olinl Blog</a>
      </p>
    </div>

    <ClientOnly>
      <!-- SSR Fallback -->
      <template #fallback>
        <div class="flex flex-1 items-center justify-center">
          <span class="text-sm text-muted-foreground">编辑器加载中...</span>
        </div>
      </template>

      <!-- Desktop: Sidebar + Editor + Preview -->
      <template v-if="!isMobile">
        <Splitpanes class="default-theme flex-1" @resized="onPaneResized">
          <!-- Left sidebar -->
          <Pane v-if="showSidebar" :size="sidebarCollapsed ? 10 : sidebarSize" :min-size="8" :max-size="28">
            <MdcComponentSidebar v-model:collapsed="sidebarCollapsed" @insert="insertTemplate" />
          </Pane>
          <!-- Editor -->
          <Pane :size="showSidebar ? contentSizes.editor : paneSize.editor" :min-size="20">
            <div class="flex h-full flex-col">
              <MdcEditorToolbar
                :source="source"
                @clear="source = ''"
                @copy="copySource"
                @insert="insertTemplate"
              />
              <MdcEditorPanel v-model="source" class="flex-1" />
            </div>
          </Pane>
          <!-- Preview -->
          <Pane :size="showSidebar ? contentSizes.preview : paneSize.preview" :min-size="20">
            <MdcPreviewPanel :source="debouncedSource" />
          </Pane>
        </Splitpanes>
      </template>

      <!-- Mobile: Tab-based layout -->
      <Tabs
        v-else
        default-value="editor"
        class="flex flex-1 flex-col"
      >
        <div class="flex items-center justify-between border-b border-border/40 px-2">
          <TabsList class="my-1">
            <TabsTrigger value="editor">
              <Icon name="lucide:code-2" class="mr-1.5 h-4 w-4" />
              编辑
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Icon name="lucide:eye" class="mr-1.5 h-4 w-4" />
              预览
            </TabsTrigger>
          </TabsList>
          <MdcEditorToolbar
            :source="source"
            :compact="true"
            @clear="source = ''"
            @copy="copySource"
            @insert="insertTemplate"
          />
        </div>
        <TabsContent value="editor" class="flex-1 overflow-hidden">
          <MdcEditorPanel v-model="source" class="h-full" />
        </TabsContent>
        <TabsContent value="preview" class="flex-1 overflow-hidden">
          <MdcPreviewPanel :source="debouncedSource" />
        </TabsContent>
      </Tabs>

    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useWindowSize } from '@vueuse/core'

useHead({
  title: 'MDC 编辑器',
})

// Welcome template
const DEFAULT_TEMPLATE = `# MDC 编辑器

欢迎使用 **MDC 在线编辑器**。左侧编辑，右侧实时预览。

## 基础 Markdown

支持 **粗体**、*斜体*、\`行内代码\`、[链接](https://olinl.com) 等标准语法。

> 引用块 — 灵感来自 blog-v3 的 Quote 组件。

## MDC 组件

### Alert 提示框

::alert{type="info" title="快速上手"}
这是 **info** 类型的提示框，支持 *Markdown* 格式。
::

::alert{type="warning" title="注意"}
这是 **warning** 类型。
::

### 行内组件

:badge[MDC]{round} :badge[Vue 3]{round} :badge[Nuxt]{round}

### 折叠面板

::folding{title="点击展开更多内容"}
这里是被折叠的内容，支持 **Markdown** 和嵌套组件。
::

### Tab 切换

::tab{:tabs='["预览","源码"]'}
#tab1
Tab 1 内容。
#tab2
\`\`\`ts
console.log("Hello MDC!")
\`\`\`
::
`

// Source
const showSidebar = ref(true)
const sidebarCollapsed = ref(true)
const source = ref(DEFAULT_TEMPLATE)

// Debounced preview (300ms)
const debouncedSource = ref(source.value)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(source, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSource.value = val
  }, 300)
})

// Pane sizes (3-pane with sidebar, 2-pane without)
const sidebarSize = ref(14)
const paneSize = reactive({ editor: 50, preview: 50 })
const contentSizes = reactive({ editor: 42, preview: 40 })

function onPaneResized(e: { size: number }[]) {
  if (showSidebar.value) {
    sidebarSize.value = e[0]?.size ?? 18
    contentSizes.editor = e[1]?.size ?? 42
    contentSizes.preview = e[2]?.size ?? 40
  } else {
    paneSize.editor = e[0]?.size ?? 50
    paneSize.preview = e[1]?.size ?? 50
  }
}

// Mobile detection
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

// Copy source
async function copySource() {
  try {
    await navigator.clipboard.writeText(source.value)
  } catch {
    // ignore
  }
}

// Insert template at cursor position from sidebar
function insertTemplate(template: string) {
  source.value += template
}
</script>

<style scoped>
:deep(.splitpanes__splitter) {
  background-color: hsl(var(--border));
  transition: background-color 0.15s ease;
}
:deep(.splitpanes__splitter:hover),
:deep(.splitpanes__splitter:active) {
  background-color: hsl(var(--primary) / 0.3);
}
:deep(.splitpanes--vertical > .splitpanes__splitter) {
  width: 4px;
  cursor: col-resize;
}
</style>
