import type { Account, Client } from 'appwrite';

export default async () => {
  const nuxtApp = useNuxtApp();

  if (nuxtApp.$appwriteAccount == null || nuxtApp.$appwriteClient == null) {
    const { application, endpoint } = useAppConfig().appwrite;

    let AppwriteClient: typeof Client, AppwriteAccount: typeof Account;
    if (process.server) {
      const { Client: NodeClient, Account: NodeAccount } = await import('node-appwrite');
      AppwriteClient = NodeClient as unknown as typeof Client;
      AppwriteAccount = NodeAccount as unknown as typeof Account;
    }
    else {
      const { Client, Account } = await import('appwrite');
      AppwriteClient = Client;
      AppwriteAccount = Account;
    }

    const appwriteClient = new AppwriteClient();

    appwriteClient
      .setEndpoint(endpoint)
      .setProject(application);

    const appwriteAccount = new AppwriteAccount(appwriteClient);

    nuxtApp.provide('appwriteClient', appwriteClient);
    nuxtApp.provide('appwriteAccount', appwriteAccount);

    return {
      appwriteClient,
      appwriteAccount,
    };
  }

  return {
    appwriteClient: nuxtApp.$appwriteClient,
    appwriteAccount: nuxtApp.$appwriteAccount,
  };
};
