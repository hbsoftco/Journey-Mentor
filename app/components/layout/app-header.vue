<script setup lang="ts">
import ThemeToggle from "~/components/layout/theme-toggle.vue";
</script>

<template>
  <div class="bg-white dark:bg-dark-blue shadow-md px-3 md:px-4 py-5 md:py-3 mb-5 md:mb-9">
    <div class="flex justify-between items-center container mx-auto">
      <NuxtLink
        to="/"
        class="font-black text-base md:text-xl text-dark-blue dark:text-white hover:opacity-80 transition-opacity no-underline"
      >
        Where in the world?
      </NuxtLink>
      <ClientOnly>
        <ThemeToggle />
      </ClientOnly>
    </div>
  </div>
</template>
