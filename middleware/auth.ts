import { useAccountStore } from '~~/pinia/account';

export default defineNuxtRouteMiddleware(() => {
  const accountStore = useAccountStore();
  if (accountStore.isLoggedIn)
    return true;

  return '/login';
});
