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
    <div class="font-serif font-bold text-4xl">
      <span to="/items" class="transition-colors">
        Your Items
      </span>
    </div>
    <div v-if="items.length > 0" class="-mx-4 md:m-0">
      <q-items-list-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="md:mb-4"
      />
      <div class="flex justify-center">
        <q-button-link to="/items/add" component="nuxt-link">
          Add an item
        </q-button-link>
      </div>
    </div>
    <div v-else class="flex flex-col min-h-64 justify-center items-center">
      <p class="mb-4">
        Seems like you did not added an item.
      </p>
      <q-button-link to="/items/add" component="nuxt-link">
        Add an item
      </q-button-link>
    </div>
  </main>
</template>

<style scoped>

</style>
