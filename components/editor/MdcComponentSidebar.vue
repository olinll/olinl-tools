<template>
  <div class="flex h-full flex-col bg-background">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-border/60 px-3 py-2.5">
      <div v-if="!collapsed" class="min-w-0">
        <h2 class="text-base font-semibold truncate">组件</h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        class="h-7 w-7 shrink-0"
        @click="collapsed = !collapsed"
        :title="collapsed ? '展开侧边栏' : '收起侧边栏'"
      >
        <Icon :name="collapsed ? 'lucide:panel-left-open' : 'lucide:panel-left-close'" class="h-4 w-4" />
      </Button>
    </div>

    <!-- Attribution badge — always visible -->
    <div class="border-b border-border/50 bg-primary/5 px-2 py-2">
      <p v-if="collapsed" class="text-[9px] leading-relaxed text-center text-muted-foreground">
        <a href="https://github.com/L33Z22L11/blog-v3" target="_blank" class="text-primary/70 hover:text-primary underline underline-offset-2">Clarity</a>
      </p>
      <div v-else class="space-y-1">
        <p class="text-[10px] leading-relaxed text-muted-foreground">
          组件适用于
          <a href="https://github.com/L33Z22L11/blog-v3" target="_blank" class="text-primary/70 hover:text-primary underline underline-offset-2">Clarity 主题</a>
        </p>
        <p class="text-[10px] leading-relaxed text-muted-foreground">
          详情见
          <a href="https://blog.zhilu.site/previews/example" target="_blank" class="text-primary/70 hover:text-primary underline underline-offset-2">组件示例</a>
          ·
          <a href="https://blog.zhilu.site" target="_blank" class="text-muted-foreground/70 hover:text-primary/70 underline underline-offset-2">纸鹿</a>
          ·
          <a href="https://blog.olinl.com" target="_blank" class="text-muted-foreground/70 hover:text-primary/70 underline underline-offset-2">Olinl Blog</a>
        </p>
      </div>
    </div>

    <!-- Collapsed state: narrow icon column with Chinese names -->
    <div
      v-if="collapsed"
      class="flex flex-1 flex-col items-center gap-0.5 overflow-auto py-1"
    >
      <button
        v-for="comp in registry"
        :key="comp.name"
        class="w-full text-center py-2 text-xs font-medium leading-tight text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        :title="`${comp.displayName} — ${comp.description}`"
        @click="$emit('insert', '\n' + generateExample(comp) + '\n')"
      >
        {{ comp.displayName }}
      </button>
    </div>

    <!-- Expanded state: full list -->
    <template v-else>
      <!-- Search -->
      <div class="border-b border-border/40 px-3 py-2">
        <div class="flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2 py-1">
          <Icon name="lucide:search" class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            v-model="search"
            type="text"
            placeholder="搜索..."
            class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="flex gap-1.5 border-b border-border/40 px-3 py-1.5">
        <button
          v-for="f in filters"
          :key="f.key"
          class="rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
          :class="filter === f.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'"
          @click="filter = f.key"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Component list -->
      <ScrollArea class="flex-1">
        <div class="space-y-2 p-2">
          <div v-if="filtered.length === 0" class="py-12 text-center text-sm text-muted-foreground">
            无匹配
          </div>
          <div
            v-for="comp in filtered"
            :key="comp.name"
            class="group rounded-md border border-border/40 bg-card/40 p-3 transition-all hover:border-primary/20 hover:bg-card cursor-pointer"
            @click="$emit('insert', '\n' + generateExample(comp) + '\n')"
            :title="'点击插入 ' + comp.displayName + ' 示例'"
          >
            <!-- Name row -->
            <div class="flex items-center gap-1.5">
              <Badge :variant="comp.syntax === 'inline' ? 'secondary' : 'default'" class="shrink-0 text-[10px] px-1.5 py-0">
                {{ comp.syntax === 'inline' ? '行' : '块' }}
              </Badge>
              <span class="text-sm font-semibold truncate">{{ comp.displayName }}</span>
            </div>

            <!-- Code name -->
            <p class="mt-0.5 text-xs text-muted-foreground/70 font-mono line-clamp-1">
              {{ comp.syntax === 'inline' ? ':' : '::' }}{{ comp.name }}
            </p>

            <!-- Description -->
            <p class="mt-0.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {{ comp.description }}
            </p>

            <!-- Props chips -->
            <div v-if="comp.props.length > 0" class="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-0.5">
              <span
                v-for="p in comp.props"
                :key="p.name"
                class="inline-flex items-baseline gap-0.5 text-[10px]"
              >
                <code class="text-[10px] text-foreground/60">{{ p.name }}</code>
                <span v-if="p.type === 'boolean'" class="text-[9px] text-muted-foreground">?</span>
                <span v-if="p.description?.includes('|')" class="text-[9px] text-primary/50 font-mono">{{ p.description }}</span>
              </span>
            </div>

            <!-- Insert hint on hover -->
            <div class="mt-1.5 flex items-center gap-1 text-xs text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="lucide:plus" class="h-3 w-3" />
              点击插入示例
            </div>
          </div>
        </div>
      </ScrollArea>
    </template>

  </div>
</template>

<script setup lang="ts">
import { mdcComponentRegistry, type MdcComponentMeta } from '~/types/mdc-components'

const emit = defineEmits<{
  insert: [template: string]
}>()

const collapsed = defineModel<boolean>('collapsed', { default: true })
const search = ref('')
const filter = ref('all')
const registry = mdcComponentRegistry

const filters = [
  { key: 'all', label: '全部' },
  { key: 'block', label: '块级' },
  { key: 'inline', label: '行内' },
]

const filtered = computed(() => {
  let list = [...registry]
  if (filter.value === 'block') {
    list = list.filter((c) => c.syntax !== 'inline')
  } else if (filter.value === 'inline') {
    list = list.filter((c) => c.syntax === 'inline')
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter((c) => c.name.includes(q) || c.displayName.includes(q) || c.description.includes(q))
  }
  return list
})

function generateExample(comp: MdcComponentMeta): string {
  switch (comp.name) {
    case 'alert':
      return `::alert{type="info" title="提示标题"}\n#title\n自定义标题（可选）\n#default\n这是提示框内容，支持 **Markdown** 格式。\n::`
    case 'badge':
      return `:badge[示例徽章]{round}\n\n:badge[带链接]{link="https://example.com" square}`
    case 'blur':
      return `:blur[这段文字需要悬停才能看清]\n\n::blur\n这里也可以放一段隐藏的多行内容。\n::`
    case 'copy':
      return `:copy{code="pnpm install @nuxtjs/mdc" prompt="$" lang="sh"}`
    case 'emoji-clock':
      return `当前时间 :emoji-clock ，指定时间 :emoji-clock{datetime="2025-01-01 12:00:00"}`
    case 'folding':
      return `::folding{title="点击展开详情"}\n这里是被折叠的内容，支持 **Markdown** 和任意嵌套组件。\n\n- 列表项一\n- 列表项二\n::`
    case 'key':
      return `按下 :key{code="Ctrl"} + :key{code="S"} 保存，或按 :key{code="Escape"} 取消。`
    case 'link-card':
      return `::link-card\n---\ntitle: MDC 组件文档\nicon: https://content.nuxt.com/favicon.ico\nlink: https://content.nuxt.com/docs/files/markdown\ndescription: Nuxt Content MDC 语法参考\n---\n::`
    case 'link-banner':
      return `::link-banner\n---\nbanner: https://picsum.photos/800/300\ntitle: 博客文章标题\ndescription: 文章简短描述\nlink: https://example.com\n---\n::`
    case 'pic':
      return `::pic\n---\nsrc: https://picsum.photos/600/400\ncaption: 图片说明文字\nzoom: true\n---\n::`
    case 'poetry':
      return `::poetry\n---\ntitle: 静夜思\nauthor: 李白\nfooter: 选自《唐诗三百首》\n---\n床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。\n::`
    case 'quote':
      return `::quote{icon="lucide:quote"}\n凡事都有可能，永远别说永远。\n::\n\n:quote[简短的一句话引用。]`
    case 'tab':
      return `::tab{:tabs='["功能介绍","代码示例"]'}\n#tab1\n这里是功能介绍的内容，支持 **Markdown**。\n\n- 特点一\n- 特点二\n#tab2\n\`\`\`ts\nconst msg = "Hello MDC!"\nconsole.log(msg)\n\`\`\`\n::`
    case 'timeline':
      return `::timeline\n{2025年1月}\n\n项目启动，确定技术方案。\n\n{2025年3月}\n\n第一个版本发布。\n\n{2025年6月}\n\n新增 MDC 组件系统。\n::`
    case 'tip':
      return `这是一段正文，:tip[鼠标悬停查看提示]{tip="这里是提示内容"}，后面继续写正文。\n\n:tip[点击复制这段文字]{copy}`
    case 'video-embed':
      return `::video-embed\n---\ntype: bilibili\nid: BV1Yr421p7rW\n---\n::`
    case 'card-list':
      return `::card-list\n- 卡片列表项一\n- 卡片列表项二\n  - 嵌套项二-一\n- 卡片列表项三\n::`
    case 'chat':
      return `::chat\n{2025-01-01 12:00}\n\n{.用户A}\n你好！欢迎使用 MDC 编辑器。\n\n{.用户B}\n谢谢！这个编辑器真好用。\n::`
    default:
      return `::${comp.name}\n内容\n::`
  }
}
</script>
