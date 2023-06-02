import type { Client as ClientBrowser, Databases } from 'appwrite';

export default async () => {
  let AppwriteDatabases: typeof Databases;
  if (process.server) {
    const { Databases: NodeDatabases } = await import('node-appwrite');
    AppwriteDatabases = NodeDatabases as unknown as typeof Databases;
  }
  else {
    const { Databases } = await import('appwrite');
    AppwriteDatabases = Databases;
  }

  const { $appwriteClient } = useNuxtApp();
  return new AppwriteDatabases($appwriteClient as ClientBrowser);
};
