<script setup lang="ts">
import { AppBarHeaderKey } from '~~/scripts/symbols';
import type { Item } from '~~/types/models';
const { t } = useI18n();

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

useHead({
  title: `${t('app.your_items')} | Quý`,
});

const { databaseId, collectionId } = useAppConfig();
const databases = useDatabases();
const { data, error } = await useAsyncData('items', () => databases.listDocuments<Item>(databaseId, collectionId));

const header = inject(AppBarHeaderKey);
if (header != null)
  header.value = t('app.your_items');
</script>

<template>
  <div>
    <q-items-list v-if="data != null && error == null" :items="data.documents" />

    <p v-else-if="error != null" class="text-center">
      {{ t('app.messages.error') }}
    </p>
  </div>
</template>

<style scoped></style>
