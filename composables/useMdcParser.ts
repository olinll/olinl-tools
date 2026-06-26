import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCRoot } from '@nuxtjs/mdc'

export function useMdcParser() {
  const parsed = ref<MDCRoot | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function parse(content: string) {
    if (!content.trim()) {
      parsed.value = null
      error.value = null
      return
    }
    loading.value = true
    error.value = null
    try {
      parsed.value = (await parseMarkdown(content)) as unknown as MDCRoot
    } catch (e) {
      error.value = (e as Error).message
      parsed.value = null
    } finally {
      loading.value = false
    }
  }

  return { parsed, error, loading, parse }
}
