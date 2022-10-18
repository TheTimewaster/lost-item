<script setup lang="ts">
import { AppBarHeaderKey } from '~~/scripts/symbols';

const appBarHeader = ref<string>('Quý');
provide(AppBarHeaderKey, appBarHeader);
</script>

<template>
  <div class="bg-lemon-50">
    <div class="mx-auto max-w-7xl relative">
      <app-bar class="w-full top-0 left-0 z-10" :header="appBarHeader" />
      <nuxt-page class="bg-white rounded-t-xl p-4" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
