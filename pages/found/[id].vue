<script setup lang="ts">
import type { Item } from '~~/types/models';
import { ItemStatus } from '~~/types/models';

const route = useRoute();

const { databaseId, collectionId } = useAppConfig().appwrite;
const databases = useDatabases();
const item = ref<Item>();
const { data: itemData } = await useAsyncData('item', () => {
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
  <main class="flex h-full justify-center items-center">
    <div v-if="item != null" class="bg-white rounded-xl max-w-lg p-8 dark:bg-dark-600">
      <p class="text-center mb-2">
        You have found
      </p>
      <h1 class="font-bold font-serif text-center mb-4 text-6xl">
        {{ item.name }}
      </h1>

      <p v-if="item.description != null && item.description.length > 0" class="text-center mb-4">
        {{ item.description }}
      </p>

      <template v-if="item.status === ItemStatus.ACTIVE">
        <p class="text-center mb-4">
          This item currently is not reported as <strong>lost</strong>. If you want to notify the owner, click on the button below:
        </p>

        <q-button label="Notify owner" class="w-full" />
      </template>

      <template v-if="item.status === ItemStatus.LOST">
        <p class="text-center mb-4">
          This item currently is reported as <strong>lost</strong>. If you want to notify the owner, click on the button below:
        </p>

        <q-button label="Notify owner" class="w-full" />
      </template>

      <p v-if="item.status === ItemStatus.FOUND" class="text-center mb-4">
        This item currently is reported as <strong>found</strong>. The owner has been notified
      </p>
    </div>
  </main>
</template>

<style scoped>

</style>
