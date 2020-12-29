// import { definitions } from '@/types/api';
import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';
// import axios from '@/axios/fetch';
import { EditUserFace } from './user';

export interface EditStudentFace extends EditUserFace {
  // form
  // id?: string; // extends
  // name?: string; // extends
  // classId?: string; // extends
  // code?: string // extends
  className?: string; // 班级名称
}

class State {

}

class Student implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> ={

  }

  actions: ActionTree<State, unknown> = {

  }
}

export default new Student();
