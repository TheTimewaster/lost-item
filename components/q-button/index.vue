<script setup lang="ts">
import useClasses from './useClasses';

const props = withDefaults(defineProps<{
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
const classes = useClasses(props);

defineExpose({
  emit,
  handleClick,
});
</script>

<template>
  <button
    class="rounded-xl font-bold"
    :class="classes"
    @click="handleClick"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
