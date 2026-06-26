// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  icon: {
    provider: 'server',
    collections: ['lucide'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  typescript: {
    strict: true,
  },
  // MDC configuration
  mdc: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
        light: 'github-light',
      },
    },
  },
})
