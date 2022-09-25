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

const disableForm = ref<boolean>(false);
const signInWithGithub = () => {
  disableForm.value = true;
  $appwriteAccount.createOAuth2Session(
    'github',
    'http://localhost:3000/items',
    'http://localhost:3000',
  );
};

const router = useRouter();
const credentials = reactive({
  email: '',
  password: '',
});
const accountStore = useAccountStore();
const errorMessage = ref<string>('');
const sessionCookie = useCookie('quy-session');
const loginWithCredentials = async (event: Event) => {
  event.preventDefault();

  if (credentials.email.length === 0 || credentials.password.length === 0) {
    errorMessage.value = 'Your credentials are incomplete!';
    return;
  }

  disableForm.value = true;
  try {
    await $appwriteAccount.createEmailSession(credentials.email, credentials.password);
    const account = await $appwriteAccount.get();
    accountStore.account = account;

    const { jwt } = await $appwriteAccount.createJWT();
    sessionCookie.value = jwt;

    router.push('/items');
  }
  catch (error) {
    errorMessage.value = i18n.t('app.messages.error');
  }
  finally {
    disableForm.value = true;
    errorMessage.value = '';
  }
};
</script>

<template>
  <main class="mx-auto max-w-lg p-8">
    <h1 class="font-bold font-serif text-4xl">
      {{ i18n.t('app.login.sign_in_with') }}
    </h1>

    <form class="mt-4" @submit="loginWithCredentials">
      <label for="email" class="block">
        <small>E-Mail</small>
      </label>
      <input
        id="email"
        v-model="credentials.email"
        type="text"
        class="border rounded-xl border-gray-400 w-full py-2 px-4 hover:outline-lemon focus:outline-lemon"
        :disabled="disableForm"
      >

      <label for="password" class="mt-4 block">
        <small>Password</small>
      </label>
      <input
        id="password"
        v-model="credentials.password"
        type="password"
        class="border rounded-xl border-gray-400 w-full py-2 px-4 hover:outline-lemon focus:outline-lemon"
        :disabled="disableForm"
        autocomplete="true"
      >

      <p v-if="errorMessage.length > 0" class="mt-4">
        {{ errorMessage }}
      </p>

      <button
        class="bg-lemon rounded-xl font-bold mt-6 w-full py-2 px-4"
        role="submit"
        :disabled="disableForm"
      >
        Sign in
      </button>
    </form>

    <p class="mt-4">
      or sign in with...
    </p>

    <div class="mt-4">
      <button
        class="rounded-xl font-bold bg-dark-300 text-white w-full py-2 px-4"
        :disabled="disableForm"
        @click="signInWithGithub"
      >
        Github
      </button>
    </div>
  </main>
</template>

<style scoped></style>
