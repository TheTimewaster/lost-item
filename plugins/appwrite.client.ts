import { useAccountStore } from '~~/pinia/account';

export default defineNuxtPlugin(async () => {
  const route = useRoute();
  let appwriteClient, appwriteAccount;
  const sessionCookie = useCookie('quy-session');

  if (!route.meta.public || sessionCookie.value != null) {
    const { application, endpoint } = useAppConfig().appwrite;
    const accountStore = useAccountStore();

    try {
      const { Client, Account } = await import('appwrite');
      appwriteClient = new Client();
      appwriteClient
        .setEndpoint(endpoint)
        .setProject(application);

      appwriteAccount = new Account(appwriteClient);
      let account = null;

      if (sessionCookie.value != null && sessionCookie.value.length > 0) {
        const session = await appwriteAccount.getSession('current');
        if (session != null) {
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

      return {
        provide: {
          appwriteClient,
          appwriteAccount,
        },
      };
    }
    catch (error) {
      console.error(error);
    }
  }

  return {};
});
