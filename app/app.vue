<script setup lang="ts">
const { toggleTheme, isDark } = useTheme();
</script>

<template>
  <button
    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-element transition-colors"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <Icon
      :name="isDark ? 'heroicons:moon' : 'heroicons:sun'"
      class="w-5 h-5"
    />
    <span class="font-semibold">
      {{ isDark ? 'Dark Mode' : 'Light Mode' }}
    </span>
  </button>
</template>
