<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import Menu from 'primevue/menu/Menu.vue';
import type MenuType from 'primevue/menu/Menu';

defineProps<{ model: Array<MenuItem & { faIcon?: string }> }>();
const menu = ref<MenuType>();
const openMenu = ($event: Event) => {
  if (menu.value != null)
    menu.value.toggle($event);
};
</script>

<template>
  <slot>
    <q-button
      square
      round
      size="sm"
      type="secondary"
      @click="openMenu"
    >
      <icon name="fa6-solid:ellipsis" class="mr-1" />
    </q-button>
  </slot>
  <Menu ref="menu" :model="model" popup>
    <template #item="{ item: menuItem }">
      <router-link
        v-if="menuItem.to"
        :to="menuItem.to"
        class="py-2 px-4 block"
      >
        <icon :name="menuItem.faIcon" class="mr-2" />
        {{ menuItem.label }}
      </router-link>
      <a
        v-else
        class="py-2 px-4 block"
        @click.stop="menuItem.command"
      >
        <icon :name="menuItem.faIcon" class="mr-2" />
        {{ menuItem.label }}
      </a>
    </template>
  </Menu>
</template>

<style scoped>

</style>
