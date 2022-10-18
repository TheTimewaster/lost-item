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
  <div class="flex w-full py-2 py-md-4 px-4 justify-between">
    <div class="flex">
      <nuxt-link v-if="parentRoute != null" :to="parentRoute" class="text-center mr-2 py-2 px-1 w-8 block">
        <icon name="fa6-solid:chevron-left" class="text-2xl text-dark-50" />
      </nuxt-link>
      <span class="font-bold font-serif text-4xl"> {{ header }} </span>
    </div>
    <button class="rounded-lg font-bold bg-lemon-500 py-2 px-4" @click="logout">
      Logout
    </button>
  </div>
</template>

<style scoped></style>
