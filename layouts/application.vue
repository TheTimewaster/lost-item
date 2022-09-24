<template>
  <div class="pt-14">
    <app-bar class="fixed top-0 z-10" />
    <nuxt-page class="max-w-7xl mx-auto p-4"></nuxt-page>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: ['bg-rose-50'],
  },
});
</script>

<style lang="scss" scoped></style>
