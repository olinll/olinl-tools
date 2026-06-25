<template>
  <div :class="{ dark: isDark }" class="min-h-screen bg-background">
    <div class="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

useHead({
  titleTemplate: '%s — Olinl Tools',
  htmlAttrs: {
    lang: 'zh-CN',
  },
})
</script>
