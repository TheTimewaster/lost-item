import { Databases as DatabasesBrowser } from 'appwrite';
import { type Client as ClientNode } from 'node-appwrite';
import { Databases as DatabasesNode } from 'node-appwrite';

export default () => {
  const { $appwriteClient } = useNuxtApp();
  if (process.server)
    return new DatabasesNode($appwriteClient as unknown as ClientNode) as unknown as DatabasesBrowser;
  else
    return new DatabasesBrowser($appwriteClient);
};
