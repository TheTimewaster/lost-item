<script setup lang="ts">
import type { PropType } from 'vue';
import type QuyModels from '~~/types/models';

defineProps({
  items: {
    type: Array as PropType<Array<QuyModels.Item>>,
    default: () => [],
  },
});
</script>

<template>
  <div>
    <template v-if="items.length > 0">
      <items-list-item v-for="item in items" :key="item.id" :item="item" />
    </template>
    <div v-else class="flex flex-col min-h-64 justify-center items-center">
      <p class="mb-4">
        Seems like you did not added an item.
      </p>
      <nuxt-link to="/items/add" class="bg-lemon rounded-lg font-bold py-2 px-4 block">
        Add an item
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>

</style>
