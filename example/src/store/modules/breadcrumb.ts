import {
  ActionTree, GetterTree, MutationTree, StoreOptions,
} from 'vuex';
import { Bread } from '@/types/base';
import Keys from '@/types/storagekeys';

class State {
  breadList: Bread[] = [];
}

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
      if (localStorage.getItem(getters.storeKey)) {
        try {
          state.breadList = JSON.parse(localStorage.getItem(getters.storeKey) as string);
        } catch (e) {
          state.breadList = [];
        }
      }
    },
    splice(state, { getters, startIndex }) {
      state.breadList.splice(startIndex, state.breadList.length);
      localStorage.setItem(getters.storeKey, JSON.stringify(state.breadList));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push(state, { getters, data }: { getters: any; data: Bread }) {
      // 可在此对特殊情况做额外处理
      state.breadList.push(data);
      localStorage.setItem(getters.storeKey, JSON.stringify(state.breadList));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete(state, { getters, index }: { getters: any; index: number }) {
      try {
        delete state.breadList[index];
      } catch (e) {
        console.log(e);
      }
      localStorage.setItem(getters.storeKey, JSON.stringify(state.breadList));
    },
    pop(state, { getters }) {
      state.breadList.pop();
      localStorage.setItem(getters.storeKey, JSON.stringify(state.breadList));
    },
    clear(state, { getters }) {
      state.breadList = [];
      localStorage.setItem(getters.storeKey, JSON.stringify(state.breadList));
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
