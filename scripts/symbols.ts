import type { InjectionKey, Ref } from 'nuxt/dist/app/compat/capi';

export const AppBarHeaderKey = Symbol('AppBarHeader') as InjectionKey<Ref<string>>;
