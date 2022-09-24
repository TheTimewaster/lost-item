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
    <template v-else>
      <button class="bg-lemon px-4 py-2 font-bold">
        Add an item
      </button>
    </template>
  </div>
</template>

<style scoped>

</style>
