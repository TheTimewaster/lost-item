<script setup lang="ts">
const props = defineProps<{
  parentRoute: string
  parentRouteLabel: string
  item: { $id: string }
  title: string
  subtitle: string
}>();
</script>

<template>
  <div class="mb-2">
    <nuxt-link :to="`/${parentRoute}`" class="font-bold transition-colors text-gray-400 hover:text-black dark:hover:text-white">
      <icon name="fa6-solid:arrow-left" class="text-sm" />
      {{ parentRouteLabel }}
    </nuxt-link>
  </div>
  <div class="flex flex-1 gap-4 justify-between">
    <div class="bg-lemon rounded-xl h-24 w-24" />
    <div class="flex-1 ">
      <p class="font-bold text-gray-400">
        {{ subtitle }}
      </p>
      <h1 class="font-serif font-bold mr-4 text-4xl inline">
        {{ title }}
      </h1>
    </div>
    <slot name="actions" />
  </div>
</template>
