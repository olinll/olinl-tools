# olinl_tools — 在线工具站

## 技术栈

- **框架**: Nuxt 3 (Vue 3 + TypeScript)
- **UI 库**: shadcn-vue (Radix Vue + Tailwind CSS)
- **样式**: Tailwind CSS 3.4 + CSS 自定义属性（亮/暗主题）
- **图标**: lucide-vue-next (via @nuxt/icon)
- **主题切换**: @nuxtjs/color-mode
- **包管理器**: pnpm 11.x
- **部署**: EdgeOne Pages（计划中）

## 项目结构

```
olinl_tools/
├── app.vue                    # 根布局（全局结构 + useHead）
├── nuxt.config.ts             # Nuxt 配置（模块、组件、Tailwind、主题）
├── tailwind.config.ts         # Tailwind 配置（颜色 tokens、动画、字体）
├── components.json            # shadcn-vue 组件注册表
├── tsconfig.json
│
├── pages/
│   └── index.vue              # 首页 — 工具卡片导航
│
├── components/
│   ├── ui/                    # shadcn-vue 组件（Button, Card, Badge, ...）
│   │   ├── Button.vue
│   │   ├── Card.vue / CardHeader.vue / CardTitle.vue / CardDescription.vue / CardContent.vue
│   │   ├── Badge.vue
│   │   ├── Separator.vue
│   │   └── tabs/ / tooltip/ / dialog/ / scroll-area/  # 编辑器配套组件
│   ├── layout/                # 布局组件
│   │   ├── SiteHeader.vue     # 顶栏（logo + 主题切换）
│   │   ├── SiteFooter.vue     # 底栏
│   │   └── ThemeToggle.vue    # 亮/暗模式切换
│   ├── home/
│   │   └── ToolCards.vue      # 工具卡片网格
│   └── editor/                # MDC 编辑器
│       ├── MdcEditorPanel.vue    # CodeMirror 6 编辑器面板
│       ├── MdcPreviewPanel.vue   # MDC 实时预览面板
│       ├── MdcEditorToolbar.vue  # 工具栏（字数、清空、复制、组件参考）
│       └── mdc/                  # 12 个 MDC 组件 Tailwind 预览封装
│           ├── AlertPreview.vue / BadgePreview.vue / BlurPreview.vue
│           ├── FoldingPreview.vue / KeyPreview.vue / QuotePreview.vue
│           ├── TabPreview.vue / TipPreview.vue / PoetryPreview.vue
│           ├── CardListPreview.vue / TimelinePreview.vue / CopyPreview.vue
│
├── composables/
│   ├── useMdcParser.ts       # parseMarkdown() 封装（错误/加载/空状态处理）
│   ├── useMdcComponents.ts   # MDC 组件注册表（kebab → Vue 组件映射）
│   └── useMdcAutocomplete.ts # CodeMirror CompletionSource（组件名自动补全）
│
├── types/
│   └── mdc-components.ts     # 组件元数据定义（Props/插槽/语法类型）
│
├── lib/
│   └── utils.ts               # cn() 工具函数（clsx + tailwind-merge）
│
├── assets/css/
│   └── main.css               # Tailwind 指令 + CSS 自定义属性（主题变量）
│
└── public/
```

## 开发命令

```bash
pnpm dev        # 启动开发服务器（默认 http://localhost:3000）
pnpm build      # 生产构建
pnpm generate   # SSG 静态生成
pnpm preview    # 预览生产构建
```

## 功能规划与完成状态

> **重要**: 每次完成阶段性工作后，请更新此状态表。将 🔜 改为 ✅，并更新日期。

| # | 功能 | 状态 | 完成日期 | 说明 |
|---|------|------|----------|------|
| 1 | 项目框架 + 首页 | ✅ 完成 | 2026-06-25 | Nuxt 3 初始化、shadcn-vue 集成、布局组件、工具卡片导航 |
| 2 | 封面/Hero 设计 | 🔜 待开始 | — | 精美封面、粒子/几何背景、渐变文字、入场动效 |
| 3 | 图床画廊 | 🔜 待开始 | — | 展示型图片画廊，参考 [v0-gallery-website](https://github.com/afoim/v0-gallery-website) |
| 4 | Diff 工具 | 🔜 待开始 | — | 文本差异对比，左右双栏/统一视图，行级/词级/字符级 |
| 5 | JSON 格式化 | 🔜 待开始 | — | 使用 [jsoneditor](https://github.com/josdejong/jsoneditor) 封装，Tree/Code/Text/Preview 四种模式 |
| 6 | 短视频解析器 | 🔜 待开始 | — | 对接 [media-fetch](https://github.com/olinll/media-fetch) API（`http://10.0.0.11:3002/`），解析+文件库+历史 |
| 7 | MDC 编辑器 | ✅ 完成 | 2026-06-26 | 分栏编辑器（CodeMirror 6 + splitpanes），12 个 MDC 组件 Tailwind 封装，实时预览 + 自动补全 |

## Git 提交规范

**所有 commit message 必须使用中文**，格式为：

```
<类型>: <描述>
```

| 类型 | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复问题 |
| `style` | 样式调整 |
| `refactor` | 重构 |
| `chore` | 杂项（依赖、配置） |
| `docs` | 文档 |

示例：
- `feat: 添加图床画廊功能`
- `fix: 修复深色模式切换异常`
- `style: 调整首页卡片间距`

## 设计约定

### shadcn-vue 组件

- 所有 UI 组件位于 `components/ui/`，由 `components.json` 注册
- 使用 `npx shadcn-vue@latest add <component>` 添加新组件
- 当前已安装：Button, Card, Badge, Separator
- `components` 配置中使用 `pathPrefix: false`，所有组件可直接以文件名引用（如 `<SiteHeader />` 而非 `<LayoutSiteHeader />`）

### 主题系统

- 使用 shadcn 标准的 CSS 自定义属性（HSL 颜色空间）
- Tailwind 引用 `hsl(var(--color))` 格式
- 亮/暗变量定义在 `assets/css/main.css` 的 `:root` 和 `.dark` 中
- 默认主题：**暗色**
- 主题切换：`useColorMode()` → `colorMode.preference = 'light' | 'dark'`

### 图标

- 使用 lucide 图标集，通过 `<Icon name="lucide:xxx" />` 引用
- 配置在 `nuxt.config.ts` 的 `icon.collections: ['lucide']`

### 工具函数

- `cn()` 位于 `lib/utils.ts`，结合 clsx 和 tailwind-merge
- 用于条件性拼接 Tailwind 类名

## 与 blog-v3 的关系

- **blog-v3** 路径：`E:\Github\blog-v3`
- blog-v3 是 Nuxt 3 博客，包含 27 个自定义 MDC 组件（Alert, Badge, Pic, Tab, Folding, Timeline, ...）
- 当前为**独立仓库**，未来 MDC 编辑器阶段将通过 pnpm workspace 引用 blog-v3 组件
- 共享技术栈：Nuxt 3 + Vue 3 + SCSS + Shiki，可复用配置模式

## 部署

- 目标平台：EdgeOne Pages（与 blog-v3 一致）
- 方式：`nuxt generate` → 静态文件上传
- API 路由（未来视频解析器等）：Nitro serverless functions

---

> **维护提示**: 每次对话开始时读取此文件，了解当前进度。完成工作后及时更新状态标记。
