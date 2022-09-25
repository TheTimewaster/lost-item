<script setup lang="ts">
const { $appwriteAccount } = useNuxtApp();
const router = useRouter();
const sessionCookie = useCookie('quy-session');
const logout = async () => {
  sessionCookie.value = '';
  await $appwriteAccount.deleteSessions();

  router.push('/');
};
</script>

<template>
  <div class="bg-white flex w-full py-2 px-4 justify-between">
    <nuxt-link to="/">
      <span class="font-font-bold font-serif text-4xl"> Quý </span>
    </nuxt-link>
    <button class="rounded-lg font-bold bg-lemon-500 py-2 px-4" @click="logout">
      Logout
    </button>
  </div>
</template>

<style scoped></style>
