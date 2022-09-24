<script setup lang="ts">
const { $appwriteAccount } = useNuxtApp();
const router = useRouter();
const logout = async () => {
  await $appwriteAccount.deleteSessions();
  router.push('/');
};
</script>

<template>
  <div class="flex justify-between w-full px-4 py-2 bg-white">
    <nuxt-link to="/">
      <span class="text-4xl font-font-bold font-serif"> Quý </span>
    </nuxt-link>
    <button class="py-2 px-4 bg-lemon-500 rounded-lg font-bold" @click="logout">
      Logout
    </button>
  </div>
</template>

<style scoped></style>
