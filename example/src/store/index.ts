import { createStore } from 'vuex';
import system from './modules/system';
import user from './modules/user';
import classe from './modules/classe';

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
    classe,
  },
});

declare module 'vuex' {
  type StoreStateType = typeof store.state;
  type ModulesType = {
    system: typeof system.state;
    user: typeof user.state;
    classe: typeof classe.state;
  }
  export function useStore<S = StoreStateType & ModulesType>(): Store<S>;
}

export default store;
