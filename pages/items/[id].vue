<script setup lang="ts">
import { Query } from 'node-appwrite';
import { AppBarHeaderKey } from '~~/scripts/symbols';
import type QuyModels from '~~/types/models';

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

const i18n = useI18n();

const route = useRoute();

const { databaseId, collectionId } = useAppConfig();
const databases = useItems();
const { data: itemData, error } = await useAsyncData('item', () => {
  try {
    return databases.listDocuments<QuyModels.Item>(
      databaseId,
      collectionId,
      [
        Query.equal('oid', route.params.id),
      ]);
  }
  catch (error) {
    console.error(error);
    throw error;
  }
});

const item = computed(() => itemData.value != null && itemData.value.total > 0 ? itemData.value.documents[0] : null);

useHead({
  title: item.value == null ? 'Quý' : `${item.value.name} | Quý`,
});

const header = inject(AppBarHeaderKey);
if (header != null)
  header.value = item.value == null ? '' : item.value.name;
</script>

<template>
  <div>
    <p v-if="error != null" class="text-center">
      {{ i18n.t('app.messages.error') }}
    </p>
    <template v-else-if="item != null">
      <h1 class="font-serif font-bold text-4xl">
        {{ item.name }}
      </h1>
    </template>
  </div>
</template>

<style scoped>

</style>
