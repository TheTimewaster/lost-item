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
const { appwriteAccount } = await useAppwrite();

const disableForm = ref<boolean>(false);
const signInWithGithub = () => {
  disableForm.value = true;
  appwriteAccount.createOAuth2Session(
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
    await appwriteAccount.createEmailSession(credentials.email, credentials.password);
    const account = await appwriteAccount.get();
    accountStore.account = account;

    const { jwt } = await appwriteAccount.createJWT();
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
    <h1 class="font-bold font-serif text-4xl text-center">
      {{ i18n.t('app.login.sign_in_with') }}
    </h1>

    <form class="mt-4" @submit="loginWithCredentials">
      <q-input-text
        id="login-password"
        v-model="credentials.email"
        class="mb-2"
        label="E-Mail"
        :disabled="disableForm"
      />

      <q-input-text
        id="login-password"
        v-model="credentials.password"
        class="mb-2"
        label="Password"
        type="password"
        autocomplete="current-password"
        disable-form
      />

      <p v-if="errorMessage.length > 0" class="mt-4">
        {{ errorMessage }}
      </p>

      <q-button
        class="mt-4 w-full"
        role="submit"
        :disabled="disableForm"
        @click="loginWithCredentials"
      >
        {{ i18n.t('app.login.login') }}
      </q-button>
    </form>

    <p class="mt-4">
      {{ i18n.t('app.login.or_login_with') }}
    </p>

    <div class="mt-4">
      <q-button
        class="rounded-xl font-bold bg-dark-300 text-white w-full py-2 px-4 dark:text-white"
        :disabled="disableForm"
        @click="signInWithGithub"
      >
        Github
      </q-button>
    </div>
  </main>
</template>

<style scoped></style>
