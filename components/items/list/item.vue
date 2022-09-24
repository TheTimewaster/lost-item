<script setup lang="ts">
import type { PropType } from 'vue';
import type QuyModels from '~~/types/models';

defineProps({
  item: {
    type: Object as PropType<QuyModels.Item>,
    required: true,
  },
});
</script>

<template>
  <nuxt-link :to="`/items/${item.oid}]`" class="flex gap-4 p-2 border-2 border-transparent bg-light-500 focus:(border-lemon) hover:(border-lemon) rounded-xl group transition-all">
    <div class="w-[5rem] h-[5rem] bg-lemon rounded-2xl text-center py-5">
      <icon name="fa6-solid:umbrella" class="text-4xl text-dark-50 " />
    </div>
    <div class="flex-1">
      <p class="text-2xl font-bold group-hover:underline-2">
        {{ item.name }}
      </p>
    </div>
    <div class="justify-self-end">
      <small>It is yours!</small>
    </div>
  </nuxt-link>
</template>

<style scoped>

</style>
