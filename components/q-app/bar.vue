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
const logout = async () => {
  sessionCookie.value = null;
  await $appwriteAccount.deleteSession('current');

  router.push('/');
};

const route = useRoute();
const parentRoute = computed(() => {
  const paths = route.fullPath.split('/');

  if (paths.length === 2)
    return null;

  return paths.slice(0, paths.length - 1).join('/');
});

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
