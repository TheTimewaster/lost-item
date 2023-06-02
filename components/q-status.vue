<script setup lang="ts">
import {
  Icon,
} from '@iconify/vue';
import OTooltip from '@oruga-ui/oruga-next/src/components/tooltip/Tooltip.vue';
import { ItemStatus } from '~~/types/models';

const props = defineProps<{
  status: ItemStatus
}>();

defineExpose({
  ItemStatus,
});

const i18n = useI18n();

const model = computed<{ label: string; icon: string; tooltip: string; itemClass: string }>(() => {
  switch (props.status) {
    case ItemStatus.ACTIVE:
      return {
        label: i18n.t('app.component.status.active.label'),
        icon: 'fa6-solid:check',
        tooltip: i18n.t('app.component.status.active.tooltip'),
        itemClass: 'bg-green text-white',
      };
    case ItemStatus.FOUND:
      return {
        label: i18n.t('app.component.status.found.label'),
        icon: 'fa6-solid:hands-holding',
        tooltip: i18n.t('app.component.status.found.tooltip'),
        itemClass: 'bg-sky text-white',
      };
    case ItemStatus.LOST:
      return {
        label: i18n.t('app.component.status.lost.label'),
        icon: 'fa6-solid:magnifying-glass',
        tooltip: i18n.t('app.component.status.lost.tooltip'),
        itemClass: 'bg-red text-white',
      };
    case ItemStatus.LOST_FOREVER:
      return {
        label: i18n.t('app.component.status.lost_forever.label'),
        icon: 'fa6-solid:xmark',
        tooltip: i18n.t('app.component.status.lost_forever.tooltip'),
        itemClass: 'bg-gray-200 text-black',
      };
  }
});
</script>

<template>
  <OTooltip
    :label="model.tooltip"
    size="large"
    position="auto"
    multiline
    content-class="!bg-white text-black rounded-lg shadow-xl min-w-[20rem] px-4 py-2 dark:!bg-gray-900 dark:text-white"
    arrow-class="hidden"
  >
    <span
      class="rounded-md flex font-bold text-sm py-1 px-2 items-center capitalize"
      :class="{
        [model.itemClass]: true,

      }"
    >
      <Icon
        :icon="model.icon"
        :name="model.icon"
        class="mr-2"
      />
      {{ model.label }}
    </span>
  </OTooltip>
</template>

<style lang="postcss">
.p-tooltip-text {
  @apply text-sm;
}
</style>
