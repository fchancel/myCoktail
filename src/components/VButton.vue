<script setup lang="ts">
defineProps<{ title: string; disabled?: boolean }>();
</script>

<template>
  <button
    class="p-3 w-full text-sm rounded-xl border-2 border-black bg-neutral-100 dark:bg-neutral-800/30 dark:border-pink-400 hover:scale-105 duration-300"
    :class="{
      'border-black/30 text-black/30 dark:text-white/30 dark:border-pink-400/20 hover:scale-100':
        disabled,
    }"
    :disabled="disabled"
  >
    {{ title }}
  </button>
</template>
