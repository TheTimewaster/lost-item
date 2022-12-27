<script setup lang="ts">
import { Permission } from 'appwrite';
import { nanoid } from 'nanoid';
import { Role } from 'node-appwrite';
import { useAccountStore } from '~~/pinia/account';
import type { Item } from '~~/types/models';

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
  const { databaseId, collectionId } = useAppConfig();
  const databases = useItems();
  const newId = nanoid(8);

  await databases.createDocument<Item>(databaseId, collectionId, newId, {
    name: newItem.name,
    description: newItem.description,
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
    <h1>Add an item</h1>
    <InputText
      id="new-item-name"
      v-model="newItem.name"
      label="Name"
      class="mb-2"
    />
    <InputText id="new-item-description" v-model="newItem.description" label="Description" />

    <div class="flex mt-4 justify-center" @click="addItem">
      <Button label="Add" class="max-w-[200px] w-100" />
    </div>
  </main>
</template>

<style scoped>

</style>
