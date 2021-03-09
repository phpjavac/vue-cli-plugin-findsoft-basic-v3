/** 展示组件 */
import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';

class State {
  current = 'list' /** 当前组件 */
}

class Exhibition implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    upCurrent(state, data) {
      state.current = data;
    },
  };

  actions: ActionTree<State, unknown> = {
    init({ commit, getters }) {
      commit('init', { getters });
    },
  };
}

export default new Exhibition();
