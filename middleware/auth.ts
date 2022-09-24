import { useAccountStore } from '~~/pinia/account';

export default defineMiddleware(() => {
  const accountStore = useAccountStore();
  if (accountStore.isLoggedIn) return true;

  return '/';
});
