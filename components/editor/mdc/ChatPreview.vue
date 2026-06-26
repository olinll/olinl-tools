<script setup lang="ts">
/**
 * ChatPreview — MDC ::chat 预览组件
 * 简化版：不支持 JSX 解析，通过 slot 展示聊天消息内容
 * 对应 blog-v3 components/content/Chat.vue
 */
</script>

<template>
  <div class="chat-preview my-4 rounded-lg border border-border/60 bg-muted/30 px-4 py-3 font-mono text-sm leading-relaxed">
    <div class="text-xs text-muted-foreground mb-2">💬 聊天记录</div>
    <div class="space-y-1 text-foreground/70">
      <slot />
    </div>
  </div>
</template>
