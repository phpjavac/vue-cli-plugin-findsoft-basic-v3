import {
  ActionTree, Commit, MutationTree, StoreOptions,
} from 'vuex';
import axios from '@/axios/api';

interface SoftConfig{
    softName: string;
    copyRightValue: string;
}

class State {
    softConfig: SoftConfig = {
      softName: '',
      copyRightValue: '',
    }
}

class System implements StoreOptions<State> {
      namespaced = true;

      state = new State();

      mutations: MutationTree<State> ={
        updateSoftConfig(store, softConfig: SoftConfig) {
          store.softConfig = softConfig;
          document.title = softConfig.softName;
        },
      }

      actions: ActionTree<State, unknown> = {
        getSoftConfig({ commit }: {commit: Commit}) {
          return new Promise<void>((resolve, reject) => {
            axios.softConfig().then((res) => {
              commit('updateSoftConfig', res.data);
              resolve();
            }).catch((err) => {
              reject(err);
            });
          });
        },
      }
}

export default new System();
