<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import type { Item } from '~~/types/models';
import { ItemStatus } from '~~/types/models';

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

const i18n = useI18n();

const route = useRoute();

const { databaseId, collectionId } = useAppConfig().appwrite;
const databases = useDatabases();
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

const changeStatus = async (status: ItemStatus) => {
  if (item.value == null)
    return;

  const updatedItem = await databases.updateDocument<Item>(
    databaseId,
    collectionId,
    item.value.$id,
    {
      status,
    },
  );

  toast.add({
    severity: 'success',
    summary: 'Status was changed to "found"',
    life: 5000,
  });

  item.value = updatedItem;
};

useHead({
  title: item.value == null ? 'Quý' : `${item.value.name} | Quý`,
});

const avatars = useAvatar();
const qrUrl = ref<string>('');
onMounted(() => {
  const url = avatars?.getQR(route.params.id as string, 200, 3);

  if (url != null)
    qrUrl.value = url.href;
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
          <div class="w-auto">
            <q-menu>
              <template #trigger>
                <q-button
                  icon="fa6-solid:ellipsis"
                  size="sm"
                  square
                  round
                />
              </template>
              <q-menu-item
                v-if="item.status !== ItemStatus.FOUND"
                label="Found"
                icon="fa6-solid:hands-holding"
                @click="changeStatus(ItemStatus.FOUND)"
              />
              <q-menu-item
                v-if="item.status !== ItemStatus.LOST"
                label="Lost"
                icon="fa6-solid:magnifying-glass"
                @click="changeStatus(ItemStatus.LOST)"
              />
              <q-menu-item
                v-if="item.status !== ItemStatus.LOST_FOREVER"
                label="Lost forever"
                icon="fa6-solid:xmark"
                @click="changeStatus(ItemStatus.LOST_FOREVER)"
              />
              <q-menu-item
                component="nuxt-link"
                label="Edit"
                icon="fa6-solid:pen"
                :to="`/items/${item.$id}/edit`"
              />
            </q-menu>
          </div>
        </template>
      </q-app-header>
      <div class="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-3">
        <div class="rounded-xl bg-gray-100 p-4 col-span-full sm:col-span-1 lg:col-span-2 dark:bg-dark-100">
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

        <div class="rounded-xl bg-gray-100 p-4 col-span-full sm:col-span-1 dark:bg-dark-100">
          <h2 class="font-bold font-serif mb-2 text-2xl">
            QR Code
          </h2>
          <div v-if="qrUrl != null" class="mt-4">
            <img :src="qrUrl" :alt="route.params.id as string" class="mx-auto">
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<style lang="postcss">

</style>
