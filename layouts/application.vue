<script setup lang="ts">
import { AppBarHeaderKey } from '~~/scripts/symbols';

const appBarHeader = ref<string>('Quý');
provide(AppBarHeaderKey, appBarHeader);
</script>

<template>
  <div class="h-screen bg-lemon-50">
    <div class="mx-auto h-100 max-w-7xl relative">
      <q-app-bar class="w-full top-0 left-0 z-10" :header="appBarHeader" />
      <nuxt-page class="bg-white rounded-t-lg p-4" />
    </div>
  </div>
  <toast />
</template>

<style lang="scss" scoped></style>
