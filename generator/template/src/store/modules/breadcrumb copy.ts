import {
  ActionTree, GetterTree, MutationTree, StoreOptions,
} from 'vuex';
import { Bread } from '@/types/base';
import Keys from '@/types/storagekeys';
import getDefaultRoutes from '@/router/defaultRoutes';
import { UserRole } from '@/types/user';

class State {
  breadList: Bread[] = [];
}

const getStoreKey = (): string => {
  try {
    console.log(sessionStorage.getItem('role') === 'student' ? `stu${Keys.Bread}` : `tch${Keys.Bread}`);
    return sessionStorage.getItem('role') || '';
  } catch (e) {
    return sessionStorage.getItem('role') || '';
    // return Keys.Bread;
  }
};

class BreadCrumb implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  // 防止学生端和教师端路径混合
  getters: GetterTree<State, unknown> = {
    storeKey() {
      try {
        return sessionStorage.getItem('role') === 'student' ? `stu${Keys.Bread}` : `tch${Keys.Bread}`;
      } catch (e) {
        return Keys.Bread;
      }
    },
  };

  mutations: MutationTree<State> = {
    init(state, { getters }) {
      // debugger;
      console.log(state.breadList, 'bbbbb', getStoreKey(), localStorage.valueOf());
      if (localStorage.getItem(getStoreKey())) {
        try {
          // state.breadList = JSON.parse(localStorage.getItem(getStoreKey()) as string);
          state.breadList = getDefaultRoutes(sessionStorage.getItem('role') as UserRole).map((v) => ({ ...v, breadcrumbName: v.name }));
        } catch (e) {
          state.breadList = [];
        }
      }
    },
    splice(state, { getters, startIndex }) {
      state.breadList.splice(startIndex, state.breadList.length);
      localStorage.setItem(getStoreKey(), JSON.stringify(state.breadList));
    },
    push(state, { getters, data }: { getters: {storeKey: string}; data: Bread }) {
      state.breadList.push(data);
      localStorage.setItem(getStoreKey(), JSON.stringify(state.breadList));
    },
    delete(state, { getters, index }: { getters: {storeKey: string}; index: number }) {
      try {
        delete state.breadList[index];
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(getStoreKey(), JSON.stringify(state.breadList));
    },
    pop(state, { getters }) {
      state.breadList.pop();
      localStorage.setItem(getStoreKey(), JSON.stringify(state.breadList));
    },
    clear(state, { getters }) {
      state.breadList = [];
      localStorage.setItem(getStoreKey(), JSON.stringify(state.breadList));
    },
  };

  actions: ActionTree<State, unknown> = {
    init({ commit, getters }) {
      commit('init', { getters });
    },
    splice({ commit, getters }, data: number) {
      commit('splice', { getters, startIndex: data });
    },
    push({ commit, getters }, data: Bread) {
      commit('push', { getters, data });
    },
    delete({ commit, getters }, index: number) {
      commit('delete', { getters, index });
    },
    pop({ commit, getters }) {
      commit('pop', { getters });
    },
    clear({ commit, getters }) {
      commit('clear', { getters });
    },
  };
}

export default new BreadCrumb();
