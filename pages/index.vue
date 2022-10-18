<script setup lang="ts">
useHead({
  title: 'Quý | Your service for tagging your personal items',
});
</script>

<template>
  <main>
    <section class="md:py-28 lg:py-36">
      <h1 class="font-serif font-font-bold text-7xl">
        Quý
      </h1>
      <p class="mt-4">
        <span class="font-serif font-font-bold">Quý</span>
        is a simple and privacy focused way to manage your lost and found items.
        <br>
      </p>
      <div class="flex mt-4 gap-4 justify-center md:justify-start">
        <nuxt-link
          to="/items"
          class="rounded-xl font-bold bg-lemon-500 text-white py-3 px-6 transition-colors hover:bg-lemon-400"
        >
          Get started
        </nuxt-link>
        <nuxt-link
          to="/about"
          class="rounded-xl font-bold bg-gray-200 py-3 px-6 transition-colors hover:bg-gray-100"
        >
          Learn more
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
