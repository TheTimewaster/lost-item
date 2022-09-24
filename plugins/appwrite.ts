import { Client, Account } from 'appwrite';
import { useAccountStore } from '~~/pinia/account';
import Appwrite from 'node-appwrite';

export default defineNuxtPlugin(async () => {
  let appwriteClient, appwriteAccount;
  const sessionCookie = useCookie('quy-session');
  const accountStore = useAccountStore();

  if (process.client) {
    try {
      appwriteClient = new Client();
      appwriteClient
        .setEndpoint('http://localhost/v1')
        .setProject('quy-lost-and-found');

      appwriteAccount = new Account(appwriteClient);
      let account = null;

      if (accountStore.account == null) {
        account = await appwriteAccount.get();
        accountStore.account = account;
      }

      let isTokenExpired = false;
      if (sessionCookie.value != null) {
        const { exp } = JSON.parse(atob(sessionCookie.value.split('.')[1]));
        console.log(exp, Math.floor(new Date().getTime() / 1000));
        isTokenExpired = exp < Math.floor(new Date().getTime() / 1000);
      }

      if ((account != null && sessionCookie.value == null) || isTokenExpired) {
        const { jwt } = await appwriteAccount.createJWT();
        sessionCookie.value = jwt;
      }
    } catch (error) {
      console.error(error);
    }
  } else if (sessionCookie.value != null) {
    try {
      appwriteClient = new Appwrite.Client();
      appwriteAccount = new Appwrite.Account(appwriteClient);

      appwriteClient
        .setEndpoint('http://localhost/v1')
        .setProject('quy-lost-and-found')
        .setJWT(sessionCookie.value);

      const account = await appwriteAccount.get();
      accountStore.account = account;
    } catch (error) {
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
