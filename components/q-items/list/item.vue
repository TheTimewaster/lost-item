<script setup lang="ts">
import type { PropType } from 'vue';
import type { Item } from '@@/types/models';

defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
});
</script>

<template>
  <nuxt-link
    :to="`/items/${item.$id}`"
    class="rounded-xl flex outline-none p-4 transition-all gap-4 group block md:bg-gray-100 hover:(bg-gray-50) focus:(outline-solid-lemon) md:dark:bg-dark-100 dark:hover:(bg-dark-50)"
  >
    <div class="bg-lemon rounded-xl h-[4rem] text-center py-3  w-[4rem] md:h-[5rem] md:py-5 md:w-[5rem]">
      <icon name="fa6-solid:umbrella" class="text-4xl text-dark-50 md:text-4xl " />
    </div>
    <div class="flex-1 justify-between md:flex">
      <p class="font-bold mb-2 text-2xl self-center group-hover:underline-2">
        {{ item.name }}
      </p>
      <div class="flex-initial">
        <q-status :status="item.status" class="h-auto" />
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>

</style>
