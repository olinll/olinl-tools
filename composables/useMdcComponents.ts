/**
 * useMdcComponents — MDC 组件注册表
 * 将 MDC 语法中的 kebab-case 组件名映射到 Tailwind 预览组件
 */
import AlertPreview from '~/components/editor/mdc/AlertPreview.vue'
import BadgePreview from '~/components/editor/mdc/BadgePreview.vue'
import BlurPreview from '~/components/editor/mdc/BlurPreview.vue'
import FoldingPreview from '~/components/editor/mdc/FoldingPreview.vue'
import KeyPreview from '~/components/editor/mdc/KeyPreview.vue'
import QuotePreview from '~/components/editor/mdc/QuotePreview.vue'
import TabPreview from '~/components/editor/mdc/TabPreview.vue'
import TipPreview from '~/components/editor/mdc/TipPreview.vue'
import PoetryPreview from '~/components/editor/mdc/PoetryPreview.vue'
import CardListPreview from '~/components/editor/mdc/CardListPreview.vue'
import TimelinePreview from '~/components/editor/mdc/TimelinePreview.vue'
import CopyPreview from '~/components/editor/mdc/CopyPreview.vue'
import PicPreview from '~/components/editor/mdc/PicPreview.vue'
import LinkCardPreview from '~/components/editor/mdc/LinkCardPreview.vue'
import LinkBannerPreview from '~/components/editor/mdc/LinkBannerPreview.vue'
import VideoEmbedPreview from '~/components/editor/mdc/VideoEmbedPreview.vue'
import ChatPreview from '~/components/editor/mdc/ChatPreview.vue'
import EmojiClockPreview from '~/components/editor/mdc/EmojiClockPreview.vue'

export function useMdcComponents() {
  return {
    alert: AlertPreview,
    badge: BadgePreview,
    blur: BlurPreview,
    chat: ChatPreview,
    copy: CopyPreview,
    'emoji-clock': EmojiClockPreview,
    folding: FoldingPreview,
    key: KeyPreview,
    'link-banner': LinkBannerPreview,
    'link-card': LinkCardPreview,
    pic: PicPreview,
    poetry: PoetryPreview,
    quote: QuotePreview,
    tab: TabPreview,
    tip: TipPreview,
    'video-embed': VideoEmbedPreview,
    'card-list': CardListPreview,
    timeline: TimelinePreview,
  }
}
