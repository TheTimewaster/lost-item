<template>
  <div>
    <h1>Items</h1>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~~/pinia/account';

definePageMeta({
  middleware: () => {
    const accountStore = useAccountStore();
    if (process.client) {
      if (accountStore.isLoggedIn) return true;

      return '/';
    }
  },
});
</script>

<style scoped></style>
