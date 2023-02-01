<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import { type QButton } from '#components';

defineProps<{ items: Array<MenuItem & { faIcon?: string }> }>();

const menuRoot = ref<HTMLDivElement>();

const menuOpened = ref<boolean>(false);
const menuBody = ref<HTMLDivElement>();
const openMenu = () => {
  menuOpened.value = true;
};
onClickOutside(menuBody, () => {
  menuOpened.value = false;
});
const bodyPositionStyle = ref<Record<string, string>>({});

const { isSmallerOrEqual } = useBreakpoints({
  md: 640,
});

watchEffect(() => {
  const root = unref(menuRoot);
  const body = unref(menuBody);
  if (root == null || body == null)
    return;

  const { x, y, height, width: rootWidth } = root.getBoundingClientRect();
  const { width: bodyWidth } = body.getBoundingClientRect();

  if (isSmallerOrEqual('md')) { bodyPositionStyle.value = {}; return; }

  if (x + bodyWidth > document.body.clientWidth) {
    bodyPositionStyle.value = {
      left: `${x + rootWidth - bodyWidth}px`,
      top: `${y + height}px`,
      zIndex: '1000',
    };
    return;
  }

  bodyPositionStyle.value = {
    left: `${x}px`,
    top: `${y + height}px`,
    zIndex: '1000',
  };
});
</script>

<template>
  <div ref="menuRoot" class="inline-block">
    <slot>
      <QButton
        square
        round
        size="sm"
        type="secondary"
        @click="openMenu"
      >
        <icon name="fa6-solid:ellipsis" class="mr-1" />
      </QButton>
    </slot>
  </div>
  <Teleport to="body">
    <div
      v-if="menuOpened"
      ref="menuBody"
      class="bg-white rounded-xl w-full bottom-0 shadow-2xl absolute md:bottom-auto md:shadow-xl md:max-h-[200px] md:w-[200px] dark:bg-dark-400"
      :style="bodyPositionStyle"
    >
      <q-menu-item v-for="(item, index) in items" :key="index" :item="item" />
    </div>
  </Teleport>
</template>

<style lang="postcss">
.p-menu {
  @apply shadow-xl py-0 w-[200px] !rounded-xl;
}
</style>
