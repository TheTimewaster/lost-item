<script setup lang="ts">
import Toast from 'primevue/toast';
import { useAccountStore } from '~~/pinia/account';
import { AppBarHeaderKey } from '~~/scripts/symbols';

const appBarHeader = ref<string>('Quý');
provide(AppBarHeaderKey, appBarHeader);
const accountStore = useAccountStore();

useHead({
  bodyAttrs: {
    class: 'text-black dark:text-white',
  },
});
</script>

<template>
  <div class="h-screen bg-lemon-50 dark:bg-dark-100">
    <div class="flex flex-col h-full mx-auto max-w-7xl relative">
      <q-app-bar v-if="accountStore.isLoggedIn" class="w-full top-0 left-0 z-10" :header="appBarHeader" />
      <nuxt-page class="bg-white rounded-lg flex-1 mb-8 p-4 dark:bg-dark-600" />
    </div>
  </div>
  <Toast />
</template>

<style lang="scss" scoped></style>
