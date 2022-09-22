<template>
  <div>
    <button @click="signIn">Sign in with Github</button>
  </div>
</template>

<script setup lang="ts">
const { $appwriteAccountClient } = useNuxtApp();
const signIn = () => {
  $appwriteAccountClient.createOAuth2Session('github', 'http://localhost:3000/items', 'http://localhost:3000')
}
</script>

<style scoped>

</style>