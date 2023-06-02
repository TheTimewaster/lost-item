<script setup lang="ts">
import ODropdown from '@oruga-ui/oruga-next/src/components/dropdown/Dropdown.vue';
</script>

<template>
  <ODropdown
    aria-role="list"
    menu-class="rounded-lg w-full md:min-w-[10rem] md:shadow-xl"
    position="bottom-left"
  >
    <template #trigger="{ active }">
      <slot name="trigger" :active="active" />
    </template>

    <template #default>
      <slot />
    </template>
  </ODropdown>
</template>
