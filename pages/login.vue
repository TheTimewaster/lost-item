<script setup lang="ts">
import { useAccountStore } from '~~/pinia/account';

definePageMeta({
  middleware: () => {
    const accountStore = useAccountStore();
    if (accountStore.isLoggedIn)
      return '/items';
  },
});
const { $appwriteAccountClient } = useNuxtApp();
const signIn = () => {
  $appwriteAccountClient.createOAuth2Session(
    'github',
    'http://localhost:3000/items',
    'http://localhost:3000',
  );
};
</script>

<template>
  <div>
    <button @click="signIn">
      Sign in with Github
    </button>
  </div>
</template>

<style scoped></style>
