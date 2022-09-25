import { Account, Client } from 'appwrite';
import Appwrite from 'node-appwrite';
import { useAccountStore } from '~~/pinia/account';

export default defineNuxtPlugin(async () => {
  let appwriteClient, appwriteAccount;
  const { application, endpoint } = useAppConfig();
  const sessionCookie = useCookie('quy-session');
  const accountStore = useAccountStore();

  if (process.client) {
    try {
      appwriteClient = new Client();
      appwriteClient
        .setEndpoint(endpoint)
        .setProject(application);

      appwriteAccount = new Account(appwriteClient);
      let account = null;

      const session = await appwriteAccount.getSession('current');
      if (session == null) {
        account = await appwriteAccount.get();
        accountStore.account = account;
      }

      let isTokenExpired = false;
      if (sessionCookie.value != null) {
        const { exp } = JSON.parse(atob(sessionCookie.value.split('.')[1]));
        isTokenExpired = exp < Math.floor(new Date().getTime() / 1000);
      }

      if ((account != null && sessionCookie.value == null) || isTokenExpired) {
        const { jwt } = await appwriteAccount.createJWT();
        sessionCookie.value = jwt;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  else if (sessionCookie.value != null) {
    try {
      appwriteClient = new Appwrite.Client();
      appwriteAccount = new Appwrite.Account(appwriteClient);

      appwriteClient
        .setEndpoint(endpoint)
        .setProject(application)
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
      appwriteClient: appwriteClient as unknown as Client,
      appwriteAccount: appwriteAccount as unknown as Account,
    },
  };
});
