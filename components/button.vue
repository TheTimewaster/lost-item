<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'primary' | 'secondary'
  label: string | number
}>(), {
  type: 'primary',
});

const emit = defineEmits<{ (e: 'click', event: Event): void }>();
const handleClick = (event: Event) => emit('click', event);
</script>

<template>
  <button
    class="rounded-lg font-bold py-2 px-4"
    :class="{
      'bg-lemon-500 hover:bg-lemon-400': type === 'primary',
      'bg-gray-200 hover:bg-gray-100': type === 'secondary',
    }"
    @click="handleClick"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
