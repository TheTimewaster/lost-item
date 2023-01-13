<script setup lang="ts">
import { type MenuItem } from 'primevue/menuitem';
import { useToast } from 'primevue/usetoast';
import type { Item } from '~~/types/models';
import { ItemStatus } from '~~/types/models';

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

const i18n = useI18n();

const route = useRoute();

const { databaseId, collectionId } = useAppConfig();
const databases = useItems();
const item = ref<Item>();

const { data: itemData, error } = await useAsyncData('item', () => {
  try {
    return databases.getDocument<Item>(
      databaseId,
      collectionId,
      route.params.id as string,
    );
  }
  catch (error) {
    console.error(error);
    throw error;
  }
});

if (itemData.value != null)
  item.value = itemData.value as Item;

const toast = useToast();
const menuModel = computed<Array<MenuItem>>(() => {
  if (item.value == null)
    return [];

  return [
    {
      label: 'Found',
      faIcon: 'fa6-solid:hands-holding',
      command: async () => {
        if (item.value == null)
          return;

        await databases.updateDocument<Item>(
          databaseId,
          collectionId,
          item.value.$id,
          {
            status: ItemStatus.FOUND,
          },
        );

        toast.add({
          severity: 'success',
          summary: 'Status was changed to "found"',
          life: 5000,
        });
      },
    },
    {
      label: 'Edit',
      faIcon: 'fa6-solid:pen',
      to: `/items/${item.value.$id}/edit`,
    },
  ];
});

useHead({
  title: item.value == null ? 'Quý' : `${item.value.name} | Quý`,
});
</script>

<template>
  <main>
    <p v-if="error != null" class="text-center">
      {{ i18n.t('app.messages.error') }}
    </p>
    <template v-else-if="item != null">
      <q-app-header
        :title="item.name"
        subtitle="Item"
        parent-route="items"
        parent-route-label="Your Items"
        :item="item"
      >
        <template #actions>
          <div class="flex gap-2 justify-end">
            <q-menu :model="menuModel" />
          </div>
        </template>
      </q-app-header>
      <div class="mt-8 grid gap-4 grid-cols-2 xl:grid-cols-3">
        <div class="rounded-xl bg-gray-100 p-4 xl:col-span-2">
          <h2 class="font-bold font-serif text-2xl">
            Details
          </h2>
          <p class="font-bold mt-4 text-sm">
            Status
          </p>
          <q-status :status="item.status" />

          <p class="font-bold mt-4 text-sm">
            Description
          </p>
          <p>
            <template v-if="item.description != null">
              {{ item.description }}
            </template>
            <span v-else> No description provided </span>
          </p>
        </div>

        <div class="rounded-xl bg-gray-100 p-4 xl:col-span-1">
          <h2 class="font-bold font-serif mb-2 text-2xl">
            QR Code
          </h2>
        </div>
      </div>
    </template>
  </main>
</template>

<style lang="postcss">
.p-menu {
  @apply shadow-xl py-0 w-[200px] !rounded-xl;
}

.p-menuitem:hover .p-menuitem-content {
  @apply cursor-pointer bg-gray-200;
}

.p-menuitem:first-child .p-menuitem-content {
  @apply rounded-t-lg;
}

.p-menuitem:last-child .p-menuitem-content {
  @apply rounded-b-lg;
}

.p-menuitem-active .p-menuitem-content {
  @apply !bg-gray-300;
}
</style>
