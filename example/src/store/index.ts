import { createStore } from 'vuex';
import system from './modules/system';
import user from './modules/user';
import classCon from './modules/classManage';
import student from './modules/student';
import teacher from './modules/teacher';

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
    classCon,
    teacher,
    student,
  },
});

declare module 'vuex' {
  type StoreStateType = typeof store.state;
  type ModulesType = {
    system: typeof system.state;
    user: typeof user.state;
    classCon: typeof classCon.state;
    teacher: typeof teacher.state;
    student: typeof student.state;
  }
  export function useStore<S = StoreStateType & ModulesType>(): Store<S>;
}

export default store;
