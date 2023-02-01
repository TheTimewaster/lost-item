<script setup lang="ts">
import { ItemStatus } from '~~/types/models';

const props = defineProps<{
  status: ItemStatus
}>();

defineExpose({
  ItemStatus,
});

const i18n = useI18n();

const model = computed<{ label: string; icon: string; tooltip: string; color: string }>(() => {
  switch (props.status) {
    case ItemStatus.ACTIVE:
      return {
        label: i18n.t('app.component.status.active.label'),
        icon: 'fa6-solid:check',
        tooltip: i18n.t('app.component.status.active.tooltip'),
        color: 'bg-green',
      };
    case ItemStatus.FOUND:
      return {
        label: i18n.t('app.component.status.found.label'),
        icon: 'fa6-solid:hands-holding',
        tooltip: i18n.t('app.component.status.found.tooltip'),
        color: 'bg-sky',
      };
    case ItemStatus.LOST:
      return {
        label: i18n.t('app.component.status.lost.label'),
        icon: 'fa6-solid:magnifying-glass',
        tooltip: i18n.t('app.component.status.lost.tooltip'),
        color: 'bg-red',
      };
    case ItemStatus.LOST_FOREVER:
      return {
        label: i18n.t('app.component.status.lost_forever.label'),
        icon: 'fa6-solid:xmark',
        tooltip: i18n.t('app.component.status.lost_forever.tooltip'),
        color: 'bg-bg-gray-100',
      };
  }
});
</script>

<template>
  <span
    v-tooltip="model.tooltip"
    class="rounded-md font-bold text-white text-sm py-1 px-2 capitalize"
    :class="{
      [model.color]: true,
    }"
  >
    <Icon :name="model.icon" class="mr-1" />
    {{ model.label }}
  </span>
</template>

<style lang="postcss">
.p-tooltip-text {
  @apply text-sm;
}
</style>
