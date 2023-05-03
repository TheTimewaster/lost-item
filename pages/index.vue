<script setup lang="ts">
useHead({
  title: 'Quý | Your service for tagging your personal items',
});

definePageMeta({
  public: true,
});

const i18n = useI18n();
</script>

<template>
  <main>
    <section class="md:py-28 lg:py-36">
      <h1 class="font-serif font-font-bold text-7xl dark:text-white">
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
          class="rounded-xl font-bold bg-lemon-500 text-black py-3 px-6 transition-colors hover:bg-lemon-400"
          no-prefetch
        >
          {{ i18n.t('main.get-started') }}
        </nuxt-link>
        <nuxt-link
          to="/about"
          class="rounded-xl font-bold bg-gray-200 py-3 px-6 transition-colors hover:bg-gray-100 text-black"
        >
          {{ i18n.t('main.learn-more') }}
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
