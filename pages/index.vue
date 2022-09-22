<template>
  <main class="max-w-7xl mx-auto p-4">
    <section class="md:py-28 lg:py-36">
      <h1 class="text-7xl font-serif font-semibold">
        Quý
      </h1>
      <p class="mt-4">
        <span class="font-serif font-semibold">Quý</span> is a simple and privacy focused way to manage your lost and found items.
        <br>
      </p>
      <div class="flex justify-center md:justify-start mt-4 gap-4">
        <nuxt-link :to="'/login'" class="px-6 py-3 transition-colors bg-yellow-500 hover:bg-yellow-400 rounded-xl font-bold text-white">
          Get started
        </nuxt-link>
        <nuxt-link :to="'/about'" class="px-6 py-3 transition-colors bg-gray-200 hover:bg-gray-100 rounded-xl font-bold">
          Learn more
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Quý | Your service for tagging your personal items'
});
</script>

<style scoped>

</style>