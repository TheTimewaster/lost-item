<script setup lang="ts">
import { useAccountStore } from '~~/pinia/account';

defineProps({
  header: {
    type: String,
    default: 'Quý',
  },
});

const { $appwriteAccount } = useNuxtApp();
const router = useRouter();
const sessionCookie = useCookie('quy-session');
const accountStore = useAccountStore();
const logout = async () => {
  // TODO: set null to session cookie does not work
  sessionCookie.value = null;
  accountStore.account = null;
  await $appwriteAccount.deleteSession('current');

  router.push('/');
};

const account = useAccountStore();
const avatarService = useAvatar();
const avatarUrl = ref<string>();

onMounted(() => {
  avatarUrl.value = avatarService?.getInitials(account.account.name, 48, 48).href;
});
</script>

<template>
  <div class="flex w-full py-2 px-4 justify-end">
    <q-button size="sm" @click="logout">
      Logout
    </q-button>

    <img
      :src="avatarUrl"
      alt=""
      class="rounded-full"
      width="32"
      height="32"
    >
  </div>
</template>

<style scoped></style>
