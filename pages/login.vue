<script setup lang="ts">
import { useAccountStore } from '~~/pinia/account';

const i18n = useI18n();

definePageMeta({
  middleware: () => {
    const accountStore = useAccountStore();
    if (accountStore.isLoggedIn)
      return '/items';
  },
});
const { $appwriteAccount } = useNuxtApp();
const signIn = () => {
  $appwriteAccount.createOAuth2Session(
    'github',
    'http://localhost:3000/items',
    'http://localhost:3000',
  );
};
</script>

<template>
  <div>
    <p>{{ i18n.t('app.login.sign_in_with') }}</p>
    <button @click="signIn">
      Github
    </button>
  </div>
</template>

<style scoped></style>
