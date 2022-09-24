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
    <span class="text-4xl font-semibold font-serif"> Quý </span>
    <button class="py-2 px-4 bg-yellow-400 rounded-lg" @click="logout">
      Logout
    </button>
  </div>
</template>

<style scoped></style>
