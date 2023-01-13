<script setup lang="ts">
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
  sessionCookie.value = '';
  await $appwriteAccount.deleteSessions();

  router.push('/');
};

const route = useRoute();
const parentRoute = computed(() => {
  const paths = route.fullPath.split('/');

  if (paths.length === 2)
    return null;

  return paths.slice(0, paths.length - 1).join('/');
});
</script>

<template>
  <div class="flex w-full py-2 px-4 justify-end">
    <button class="rounded-xl font-bold bg-lemon-500 py-2 px-4" @click="logout">
      Logout
    </button>
  </div>
</template>

<style scoped></style>
