import { useAccountStore } from '~/pinia/account';

export default defineNuxtPlugin(async () => {
  const { Client, Account } = await import('node-appwrite');

  const { application, endpoint } = useAppConfig().appwrite;
  const sessionCookie = useCookie('quy-session');
  const accountStore = useAccountStore();

  const appwriteClient = new Client();
  const appwriteAccount = new Account(appwriteClient);

  appwriteClient
    .setEndpoint(endpoint)
    .setProject(application);

  if (sessionCookie.value != null) {
    try {
      appwriteClient
        .setJWT(sessionCookie.value);

      const account = await appwriteAccount.get();
      accountStore.account = account;
    }
    catch (error) {
    // do nothing and let the client fix
    }
  }

  return {
    provide: {
      appwriteClient,
      appwriteAccount,
    },
  };
});
