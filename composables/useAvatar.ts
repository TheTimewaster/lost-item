import { Avatars } from 'appwrite';

export default () => {
  const { $appwriteClient } = useNuxtApp();
  const avatars = (process.client) ? new Avatars($appwriteClient) : null;

  return avatars;
};
