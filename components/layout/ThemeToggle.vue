<template>
  <Button
    variant="ghost"
    size="icon"
    @click="toggleTheme"
    :aria-label="isDark ? '切换到亮色模式' : '切换到深色模式'"
  >
    <Icon
      :name="isDark ? 'lucide:sun' : 'lucide:moon'"
      class="h-[1.2rem] w-[1.2rem] transition-all"
    />
  </Button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
