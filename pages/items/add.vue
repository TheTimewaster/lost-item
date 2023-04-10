<script setup lang="ts">
import { Permission } from 'appwrite';
import { nanoid } from 'nanoid';
import { Role } from 'node-appwrite';
import { useAccountStore } from '~~/pinia/account';
import type { Item } from '~~/types/models';
import { ItemStatus } from '~~/types/models';

definePageMeta({
  layout: 'application',
  middleware: 'auth',
});

useHead({
  title: 'Add an item | Quý',
});

interface NewItem {
  name: string
  description: string
}

const newItem = reactive<NewItem>({
  name: '',
  description: '',
});

const router = useRouter();
const account = useAccountStore();
const addItem = async () => {
  const { databaseId, collectionId } = useAppConfig().appwrite;
  const databases = useDatabases();
  const newId = nanoid(8);

  await databases.createDocument<Item>(databaseId, collectionId, newId, {
    name: newItem.name,
    description: newItem.description,
    status: ItemStatus.ACTIVE,
    owner: account.account.$id,
  }, [
    Permission.read(Role.any()),
    Permission.read(Role.user(account.account.$id)),
    Permission.write(Role.user(account.account.$id)),
    Permission.delete(Role.user(account.account.$id)),
  ]);
  router.push(`/items/${newId}`);
};
</script>

<template>
  <main>
    <div class="flex font-serif font-bold text-4xl text-gray-400 items-center justify-between">
      <span>
        <nuxt-link to="/items" class="transition-colors hover:text-black dark:hover:text-white">
          Your Items
        </nuxt-link>
        <span class="mx-4 text-4xl text-gray-400">/</span>
        <h1 class="text-black mr-4 inline dark:text-white">
          Add item
        </h1>
      </span>
    </div>

    <div class="mt-8">
      <QInputText
        id="new-item-name"
        v-model="newItem.name"
        label="Name"
        class="mb-2"
      />
      <QInputText id="new-item-description" v-model="newItem.description" label="Description" />
      <div class="flex mt-4 justify-center" @click="addItem">
        <QButton label="Add" class="max-w-[200px] w-100" />
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
