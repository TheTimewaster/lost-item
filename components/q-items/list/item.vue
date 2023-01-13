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
    class="border-transparent rounded-xl flex bg-gray-50  border-2 p-2 transition-all gap-4 group hover:(border-lemon) focus:(border-lemon-700)"
  >
    <div class="bg-lemon rounded-xl h-[5rem] text-center py-5 w-[5rem]">
      <icon name="fa6-solid:umbrella" class="text-4xl text-dark-50 " />
    </div>
    <div class="flex-1">
      <p class="font-bold text-2xl group-hover:underline-2">
        {{ item.name }}
      </p>
      <p class="w-full overflow-ellipsis">
        {{ item.description }}
      </p>
    </div>
    <div class="mr-2 justify-self-end">
      <q-status :status="item.status" />
    </div>
  </nuxt-link>
</template>

<style scoped>

</style>
