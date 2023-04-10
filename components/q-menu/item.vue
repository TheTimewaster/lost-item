<script setup lang="ts">
import { Icon } from '@iconify/vue';
import ODropdownItem from '@oruga-ui/oruga-next/src/components/dropdown/DropdownItem.vue';

withDefaults(defineProps<{
  label: string
  icon?: string
  component?: 'button' | 'nuxt-link' | 'a'
  to?: string
}>(), {
  icon: undefined,
  component: 'button',
});

const emit = defineEmits<{ (e: 'click', event: Event): void }>();
const classes = 'bg-white text-black py-2 px-4 flex items-center dark:bg-dark-100 dark:text-white hover:bg-gray-100 hover:dark:bg-dark-50 first:rounded-t-lg last:rounded-b-lg w-full text-left';
</script>

<template>
  <ODropdownItem
    v-if="component === 'nuxt-link'"
    tag="router-link"
    :to="to"
    aria-role="listitem"
    :class="classes"
    override
  >
    <slot>
      <Icon
        v-if="icon != null"
        :icon="icon"
        :name="icon"
        class="w-4"
        :class="{ 'mr-4': label != null }"
      />
      {{ label }}
    </slot>
  </ODropdownItem>

  <ODropdownItem
    v-else-if="component === 'a'"
    tag="a"
    aria-role="listitem"
    :to="to"
    :class="classes"
    override
  >
    <slot>
      <Icon
        v-if="icon != null"
        :icon="icon"
        :name="icon"
        class="w-4"
        :class="{ 'mr-4': label != null }"
      />
      {{ label }}
    </slot>
  </ODropdownItem>

  <ODropdownItem
    v-else
    :tag="component"
    aria-role="listitem"
    :class="classes"
    override
    @click="$event => emit('click', $event)"
  >
    <slot>
      <Icon
        v-if="icon != null"
        :icon="icon"
        :name="icon"
        class="w-4"
        :class="{ 'mr-4': label != null }"
      />
      {{ label }}
    </slot>
  </ODropdownItem>
</template>
