import type { Models } from 'appwrite';
import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      account: null as unknown as Models.Account<Models.Preferences>,
    };
  },
  getters: {
    isLoggedIn: state => state.account != null,
  },
});
