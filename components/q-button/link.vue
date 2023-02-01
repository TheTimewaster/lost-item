<script setup lang="ts">
import useClasses from './useClasses';

const props = withDefaults(defineProps<{
  component?: 'nuxt-link' | 'a'
  to: string
  type?: 'primary' | 'secondary'
  label?: string | number
  square?: boolean
  round?: boolean
  size?: 'sm' | 'lg'
}>(), {
  component: 'a',
  type: 'primary',
  square: false,
  round: false,
  size: 'lg',
});

const classes = useClasses(props);
const attrs = useAttrs();
const attributes = computed(() => ({
  ...attrs,
  to: props.component === 'nuxt-link' ? props.to : undefined,
  href: props.component === 'a' ? props.to : undefined,
  class: classes.value,
}));
</script>

<template>
  <nuxt-link
    v-if="component === 'nuxt-link'"
    :to="to"
    class="leading-8"
    :class="attributes.class"
  >
    <slot>{{ label }}</slot>
  </nuxt-link>
  <component
    :is="component"
    v-else
    class="leading-8"
    v-bind="attributes"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<style scoped>

</style>
