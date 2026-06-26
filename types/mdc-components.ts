/**
 * MDC 组件元数据 — 用于自动补全和组件文档
 */
export interface MdcPropMeta {
  name: string
  type: 'string' | 'boolean' | 'number' | 'string[]'
  defaultValue?: string
  description?: string
}

export interface MdcComponentMeta {
  name: string
  displayName: string
  description: string
  syntax: 'block-inline' | 'block-yaml' | 'inline'
  props: MdcPropMeta[]
  slots?: string[]
}

export const mdcComponentRegistry: MdcComponentMeta[] = [
  {
    name: 'alert',
    displayName: 'Alert 提示框',
    description: '带图标的提示框，支持 tip/info/question/warning/error 五种类型',
    syntax: 'block-inline',
    props: [
      { name: 'type', type: 'string', defaultValue: 'info', description: 'tip | info | question | warning | error' },
      { name: 'card', type: 'boolean', description: '卡片风格（默认开启）' },
      { name: 'flat', type: 'boolean', description: '扁平风格' },
      { name: 'icon', type: 'string', description: '自定义图标（lucide:xxx）' },
      { name: 'title', type: 'string', description: '标题文字' },
    ],
    slots: ['title', 'default'],
  },
  {
    name: 'badge',
    displayName: 'Badge 徽章',
    description: '行内标签徽章，支持圆形/方形样式',
    syntax: 'inline',
    props: [
      { name: 'img', type: 'string', description: '左侧图标 URL' },
      { name: 'link', type: 'string', description: '点击跳转链接' },
      { name: 'round', type: 'boolean', description: '圆形样式' },
      { name: 'square', type: 'boolean', description: '方形样式' },
    ],
  },
  {
    name: 'blur',
    displayName: 'Blur 模糊文字',
    description: '默认模糊，鼠标悬停后清晰显示',
    syntax: 'inline',
    props: [
      { name: 'text', type: 'string', description: '内联文字（或使用默认插槽）' },
    ],
  },
  {
    name: 'folding',
    displayName: 'Folding 折叠面板',
    description: '可折叠/展开的内容面板，使用 HTML details 元素',
    syntax: 'block-inline',
    props: [
      { name: 'title', type: 'string', description: '折叠标题' },
      { name: 'open', type: 'boolean', description: '默认展开' },
    ],
    slots: ['title', 'default'],
  },
  {
    name: 'key',
    displayName: 'Key 键盘按键',
    description: '渲染为 kbd 元素，支持修饰键（Ctrl/Shift/Alt）',
    syntax: 'inline',
    props: [
      { name: 'code', type: 'string', description: '按键值' },
      { name: 'text', type: 'string', description: '显示文字（覆盖 code）' },
      { name: 'ctrl', type: 'boolean', description: 'Ctrl 修饰键' },
      { name: 'shift', type: 'boolean', description: 'Shift 修饰键' },
      { name: 'alt', type: 'boolean', description: 'Alt 修饰键' },
      { name: 'meta', type: 'boolean', description: 'Meta/Win/Cmd 修饰键' },
    ],
  },
  {
    name: 'quote',
    displayName: 'Quote 引用块',
    description: '带背景装饰图标的引用块',
    syntax: 'block-inline',
    props: [
      { name: 'icon', type: 'string', defaultValue: 'lucide:quote', description: '背景装饰图标' },
    ],
    slots: ['default'],
  },
  {
    name: 'tab',
    displayName: 'Tab 标签页',
    description: '多标签页切换容器，支持 #tab1, #tab2 命名插槽',
    syntax: 'block-inline',
    props: [
      { name: 'tabs', type: 'string[]', description: '标签页名称数组，如 ["Tab1","Tab2"]' },
      { name: 'center', type: 'boolean', description: '标签按钮居中' },
      { name: 'active', type: 'number', description: '默认激活的标签索引（0 开始）' },
    ],
    slots: ['tab1', 'tab2', '...'],
  },
  {
    name: 'tip',
    displayName: 'Tip 注释',
    description: '虚线下方标注文字，支持工具提示和点击复制',
    syntax: 'inline',
    props: [
      { name: 'text', type: 'string', description: '内联文字' },
      { name: 'tip', type: 'string', description: '悬浮提示文字' },
      { name: 'copy', type: 'boolean', description: '点击复制内容' },
    ],
  },
  {
    name: 'poetry',
    displayName: 'Poetry 诗文',
    description: '诗词/短文的居中排版容器',
    syntax: 'block-inline',
    props: [
      { name: 'title', type: 'string', description: '标题' },
      { name: 'author', type: 'string', description: '作者' },
      { name: 'footer', type: 'string', description: '页脚文字' },
    ],
    slots: ['default'],
  },
  {
    name: 'pic',
    displayName: 'Pic 图片',
    description: '图文展示，支持标题和缩放功能',
    syntax: 'block-yaml',
    props: [
      { name: 'src', type: 'string', description: '图片 URL（必填）' },
      { name: 'caption', type: 'string', description: '图片标题/说明' },
      { name: 'alt', type: 'string', description: '替代文本' },
      { name: 'zoom', type: 'boolean', defaultValue: 'true', description: '是否可缩放' },
    ],
    slots: ['image', 'caption'],
  },
  {
    name: 'card-list',
    displayName: 'CardList 卡片列表',
    description: '将列表项渲染为卡片网格（2 列）',
    syntax: 'block-inline',
    props: [],
    slots: ['default'],
  },
  {
    name: 'timeline',
    displayName: 'Timeline 时间线',
    description: '带圆点标记的垂直时间线',
    syntax: 'block-inline',
    props: [],
    slots: ['default'],
  },
  {
    name: 'copy',
    displayName: 'Copy 代码行',
    description: '可复制的代码行，带提示前缀和复制按钮',
    syntax: 'inline',
    props: [
      { name: 'code', type: 'string', description: '代码内容（必填）' },
      { name: 'prompt', type: 'string', defaultValue: '$', description: '命令行提示符' },
      { name: 'lang', type: 'string', description: '语言标识' },
    ],
  },
  {
    name: 'link-card',
    displayName: 'LinkCard 链接卡片',
    description: '带图标、标题、描述的链接卡片',
    syntax: 'block-yaml',
    props: [
      { name: 'icon', type: 'string', description: '图标 URL' },
      { name: 'title', type: 'string', description: '标题' },
      { name: 'description', type: 'string', description: '描述文字' },
      { name: 'link', type: 'string', description: '链接地址' },
    ],
  },
  {
    name: 'link-banner',
    displayName: 'LinkBanner 横幅卡片',
    description: '带横幅图片、标题、描述的大尺寸链接卡片',
    syntax: 'block-yaml',
    props: [
      { name: 'banner', type: 'string', description: '横幅图片 URL' },
      { name: 'title', type: 'string', description: '标题' },
      { name: 'description', type: 'string', description: '描述文字' },
      { name: 'link', type: 'string', description: '链接地址' },
    ],
  },
  {
    name: 'video-embed',
    displayName: 'VideoEmbed 视频嵌入',
    description: '嵌入 B 站/抖音/YouTube 等平台视频',
    syntax: 'block-yaml',
    props: [
      { name: 'type', type: 'string', description: 'raw | bilibili | douyin | douyin-wide | youtube | tiktok' },
      { name: 'id', type: 'string', description: '视频 ID 或 URL' },
      { name: 'poster', type: 'string', description: '封面图 URL' },
      { name: 'autoplay', type: 'boolean', description: '自动播放' },
    ],
  },
  {
    name: 'chat',
    displayName: 'Chat 聊天记录',
    description: '模拟聊天消息气泡（预览简化版）',
    syntax: 'block-inline',
    props: [],
    slots: ['default'],
  },
  {
    name: 'emoji-clock',
    displayName: 'EmojiClock 时钟',
    description: '显示当前时间的 emoji 时钟',
    syntax: 'inline',
    props: [
      { name: 'datetime', type: 'string', description: '指定时间（ISO 格式）' },
      { name: 'rotate', type: 'boolean', description: '旋转表盘模式' },
    ],
  },
]
