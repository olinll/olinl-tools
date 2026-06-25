<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
        <span class="text-lg font-bold tracking-tight">
          <span class="text-primary">Olinl</span>
          <span class="text-muted-foreground"> Tools</span>
        </span>
      </NuxtLink>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" as="a" href="https://blog.olinl.com" target="_blank" rel="noopener">
          <Icon name="lucide:book-open" class="h-4 w-4" />
          <span>Blog</span>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
