import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';
import { Bread } from '@/types/base';
import Keys from '@/types/storagekeys';

class State {
  breadList: Bread[] = [];
}

// 防止学生端和教师端路径混合
const storeKey = () => {
  try {
    return sessionStorage.getItem('role') === 'student' ? `stu${Keys.Bread}` : `tch${Keys.Bread}`;
  } catch (e) {
    return Keys.Bread;
  }
};

class BreadCrumb implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    init(state) {
      if (localStorage.getItem(storeKey())) {
        try {
          state.breadList = JSON.parse(localStorage.getItem(storeKey()) as string);
        } catch (e) {
          state.breadList = [];
        }
      }
    },
    splice(state, { startIndex }) {
      state.breadList.splice(startIndex, state.breadList.length);
      localStorage.setItem(storeKey(), JSON.stringify(state.breadList));
    },
    push(state, { data }: { getters: {storeKey: string}; data: Bread }) {
      state.breadList.push(data);
      localStorage.setItem(storeKey(), JSON.stringify(state.breadList));
    },
    delete(state, { index }: { getters: {storeKey: string}; index: number }) {
      try {
        delete state.breadList[index];
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(storeKey(), JSON.stringify(state.breadList));
    },
    pop(state) {
      state.breadList.pop();
      localStorage.setItem(storeKey(), JSON.stringify(state.breadList));
    },
    clear(state) {
      state.breadList = [];
      localStorage.setItem(storeKey(), JSON.stringify(state.breadList));
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
