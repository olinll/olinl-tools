<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <component
      :is="tool.available ? NuxtLink : 'div'"
      v-for="(tool, index) in tools"
      :key="tool.id"
      :to="tool.available ? tool.route : undefined"
      class="block"
    >
      <Card
        class="group relative cursor-pointer border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
        :style="{ animationDelay: `${index * 80}ms` }"
        :class="[tool.available ? '' : 'opacity-70 cursor-default']"
      >
        <CardHeader>
          <div class="flex items-start justify-between">
            <!-- Icon -->
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg"
              :class="[
                tool.available
                  ? 'bg-primary/10 text-primary group-hover:bg-primary/15'
                  : 'bg-muted text-muted-foreground',
              ]"
            >
              <Icon :name="tool.icon" class="h-5 w-5" />
            </div>

            <!-- Status badge -->
            <Badge
              :variant="tool.available ? 'default' : 'secondary'"
              class="text-[10px]"
            >
              {{ tool.status }}
            </Badge>
          </div>

          <CardTitle class="mt-3 text-base">
            {{ tool.title }}
          </CardTitle>
          <CardDescription class="line-clamp-2">
            {{ tool.description }}
          </CardDescription>
        </CardHeader>
      </Card>
    </component>
  </div>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')

const tools = [
  {
    id: 'gallery',
    title: '图床画廊',
    description: '展示图片集，支持多格式预览与链接复制。灵感来自 v0-gallery-website。',
    icon: 'lucide:image',
    status: '计划中',
    available: false,
    route: '/gallery',
  },
  {
    id: 'diff',
    title: 'Diff 工具',
    description: '文本差异对比，支持行级/词级/字符级差异，左右双栏与统一视图。',
    icon: 'lucide:git-compare',
    status: '计划中',
    available: false,
    route: '/diff',
  },
  {
    id: 'json',
    title: 'JSON 格式化',
    description: '基于 jsoneditor，支持树形/代码/文本/预览四种模式与 JSON Schema 校验。',
    icon: 'lucide:braces',
    status: '计划中',
    available: false,
    route: '/json',
  },
  {
    id: 'video',
    title: '短视频解析',
    description: '对接 media-fetch 后端，支持 8 大平台链接解析、文件库与历史记录。',
    icon: 'lucide:video',
    status: '计划中',
    available: false,
    route: '/video',
  },
  {
    id: 'editor',
    title: 'MDC 编辑器',
    description: '博客文章编辑器，集成 blog-v3 组件实时预览，分栏编辑所见即所得。',
    icon: 'lucide:pen-line',
    status: '可用',
    available: true,
    route: '/editor',
  },
]
</script>
