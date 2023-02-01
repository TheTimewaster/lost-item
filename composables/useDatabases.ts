import { Databases as DatabasesBrowser } from 'appwrite';
import type { Client as ClientNode } from 'node-appwrite';
import { Databases as DatabasesNode } from 'node-appwrite';

export default () => {
  const { $appwriteClient } = useNuxtApp();
  const databases = (process.server) ? new DatabasesNode($appwriteClient as unknown as ClientNode) as unknown as DatabasesBrowser : new DatabasesBrowser($appwriteClient);

  return databases;
};
