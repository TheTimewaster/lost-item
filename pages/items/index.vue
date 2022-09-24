<script setup lang="ts">
import type QuyModels from '~~/types/models';
const { t } = useI18n();

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

useHead({
  title: `${t('app.your_items')} | Quý`,
});

const { databaseId, collectionId } = useAppConfig();
const databases = useItems();
const { data, error } = await useAsyncData('documents', () => databases.listDocuments<QuyModels.Item>(databaseId, collectionId));
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold font-serif">
      {{ t('app.your_items') }}
    </h1>

    <items-list v-if="data != null && error == null" :items="data.documents" class="mt-4" />

    <p v-else-if="error != null" class="text-center">
      {{ t('app.messages.error') }}
    </p>
  </div>
</template>

<style scoped></style>
