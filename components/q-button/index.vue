<script setup lang="ts">
import OButton from '@oruga-ui/oruga-next/src/components/button/Button.vue';
import { Icon } from '@iconify/vue';
import useClasses from './useClasses';

const props = withDefaults(defineProps<{
  component?: 'button' | 'nuxt-link' | 'a'
  to?: string | object
  type?: 'primary' | 'secondary'
  label?: string | number
  icon?: string
  square?: boolean
  round?: boolean
  size?: 'sm' | 'lg'
}>(), {
  to: '',
  type: 'primary',
  square: false,
  round: false,
  size: 'lg',
});

const emit = defineEmits<{ (e: 'click', event: Event): void }>();
function handleClick(event: Event) {
  emit('click', event);
}
const classes = useClasses(props);

defineExpose({
  emit,
  handleClick,
});
</script>

<template>
  <OButton
    v-if="component === 'nuxt-link'"
    tag="router-link"
    :root-class="classes"
    :to="to"
    override
  >
    <slot>
      <Icon
        v-if="icon != null"
        :icon="icon"
        :name="icon"
        :class="{ 'mr-2': label != null }"
      />
      {{ label }}
    </slot>
  </OButton>

  <OButton
    v-else-if="component === 'a'"
    tag="a"
    :root-class="classes"
    :to="to"
    override
  >
    <slot>
      <Icon
        v-if="icon != null"
        :icon="icon"
        :name="icon"
        :class="{ 'mr-2': label != null }"
      />
      {{ label }}
    </slot>
  </OButton>

  <OButton
    v-else
    :root-class="classes"
    override
    @click="handleClick"
  >
    <slot>
      <Icon
        v-if="icon != null"
        :icon="icon"
        :name="icon"
        :class="{ 'mr-2': label != null }"
      />
      {{ label }}
    </slot>
  </OButton>
</template>
