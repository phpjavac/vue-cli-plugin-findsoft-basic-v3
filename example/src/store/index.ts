import { createStore } from 'vuex';
import system from './modules/system';
import user from './modules/user';

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    system,
    user,
  },
});

declare module 'vuex' {
  type StoreStateType = typeof store.state;
  type ModulesType = {
    system: typeof system.state;
    user: typeof user.state;
  }
  export function useStore<S = StoreStateType & ModulesType>(): Store<S>;
}

export default store;
