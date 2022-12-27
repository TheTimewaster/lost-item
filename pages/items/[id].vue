<script setup lang="ts">
import { Query } from 'node-appwrite';
import type { Item } from '~~/types/models';

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

const i18n = useI18n();

const route = useRoute();

const { databaseId, collectionId } = useAppConfig();
const databases = useItems();
const item = ref<Item>();

const { data: itemData, error } = await useAsyncData('item', () => {
  try {
    return databases.getDocument<Item>(
      databaseId,
      collectionId,
      route.params.id as string,
    );
  }
  catch (error) {
    console.error(error);
    throw error;
  }
});

if (itemData.value != null)
  item.value = itemData.value as Item;

useHead({
  title: item.value == null ? 'Quý' : `${item.value.name} | Quý`,
});
</script>

<template>
  <main>
    <p v-if="error != null" class="text-center">
      {{ i18n.t('app.messages.error') }}
    </p>
    <template v-else-if="item != null">
      <div class="font-serif font-bold text-4xl text-gray-400">
        <nuxt-link to="/items" class="transition-colors hover:text-black">
          Your Items
        </nuxt-link>
        <span class="mx-4 text-4xl text-gray-400">/</span>

        <h1 class="text-black inline">
          {{ item.name }}
        </h1>
      </div>

      <div class="mt-8 grid gap-4 grid-cols-2">
        <div class="rounded-xl bg-lemon-100 p-4">
          <div class="flex justify-between">
            <h2 class="font-bold font-serif text-2xl">
              Details
            </h2>
            <button class="rounded-full h-8 transition-colors w-8 hover:bg-lemon-400">
              <icon name="fa6-solid:pen" class="text-sm" />
            </button>
          </div>
          <p class="font-bold text-sm">
            Description
          </p>
          <p>
            {{ item.description }}
          </p>
        </div>

        <div class="rounded-xl bg-lemon-100 p-4">
          <h2 class="font-bold font-serif text-2xl">
            QR Code
          </h2>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>

</style>
