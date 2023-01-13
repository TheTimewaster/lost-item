<script setup lang="ts">
import type { PropType } from 'vue';
import type { Item } from '~~/types/models';

defineProps({
  items: {
    type: Array as PropType<Array<Item>>,
    default: () => [],
  },
});
</script>

<template>
  <main>
    <div class="font-serif font-bold text-black text-4xl">
      <span to="/items" class="transition-colors">
        Your Items
      </span>
    </div>
    <div v-if="items.length > 0" class="mt-8">
      <q-items-list-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="mb-4"
      />
      <div class="flex justify-center">
        <nuxt-link to="/items/add" class="bg-lemon rounded-xl font-bold py-2 px-4 block">
          Add an item
        </nuxt-link>
      </div>
    </div>
    <div v-else class="flex flex-col min-h-64 justify-center items-center">
      <p class="mb-4">
        Seems like you did not added an item.
      </p>
      <nuxt-link to="/items/add" class="bg-lemon rounded-xl font-bold py-2 px-4 block">
        Add an item
      </nuxt-link>
    </div>
  </main>
</template>

<style scoped>

</style>
