// import { definitions } from '@/types/api';
import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';
// import axios from '@/axios/fetch';

class State {

}

class Teacher implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> ={

  }

  actions: ActionTree<State, unknown> = {

  }
}

export default new Teacher();
