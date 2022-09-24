<script setup lang="ts">
import type QuyModels from '~~/types/models';

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

useHead({
  title: 'Your Items | Quy',
});

const { t } = useI18n();

const databases = useItems();
const { data, error } = await useAsyncData('documents', () => databases.listDocuments<QuyModels.Item>('632f022a4cfb7b0fa965', '632f022f915002331adc'));
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
