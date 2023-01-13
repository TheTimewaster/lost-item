<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'primary' | 'secondary'
  label?: string | number
  square?: boolean
  round?: boolean
  size?: 'sm' | 'lg'
}>(), {
  type: 'primary',
  square: false,
  round: false,
  size: 'lg',
});

const emit = defineEmits<{ (e: 'click', event: Event): void }>();
const handleClick = (event: Event) => emit('click', event);
</script>

<template>
  <button
    class="rounded-xl font-bold"
    :class="{
      'bg-lemon-500 hover:bg-lemon-400': type === 'primary',
      'bg-gray-200 hover:bg-gray-100': type === 'secondary',
      'w-12': square && size === 'lg',
      'h-12 px-4 py-2': size === 'lg',
      'w-8': square && size === 'sm',
      'h-8 px-2 py-1 leading-none': size === 'sm',
      'rounded-full': round,
    }"
    @click="handleClick"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
