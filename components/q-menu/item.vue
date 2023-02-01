<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';

defineProps<{
  item: MenuItem & { faIcon?: string }
}>();
</script>

<template>
  <router-link
    v-if="item.to"
    :to="item.to"
    class="py-4 px-4 block md:py-2 first:pb-0"
  >
    <icon v-if="item.faIcon" :name="item.faIcon" class="mr-2" />
    {{ item.label }}
  </router-link>
  <a
    v-else
    class="py-4 px-4 block md:py-2 first:pb-0"
    @click.stop="item.command"
  >
    <icon v-if="item.faIcon" :name="item.faIcon" class="mr-2" />
    {{ item.label }}
  </a>
</template>
