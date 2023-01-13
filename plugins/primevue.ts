import PrimeVue from 'primevue/config';
import Menu from 'primevue/menu/Menu.vue';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast/Toast.vue';
import Tooltip from 'primevue/tooltip';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: false });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Menu', Menu);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.directive('tooltip', Tooltip);

  // other components that you need
});
