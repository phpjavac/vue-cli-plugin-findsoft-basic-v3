import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/fetch';
import { message } from 'ant-design-vue';
import router from '../../router/index';

interface UserInfo{
  role: string;
  name: string;
  code: string;
  token: string;
}
class State {}

class User implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    saveUserInfo(state: State, userInfo: UserInfo) {
      sessionStorage.setItem('role', userInfo.role);
      sessionStorage.setItem('name', userInfo.name);
      sessionStorage.setItem('code', userInfo.code);
      sessionStorage.setItem('token', userInfo.token);
    },
  };

  actions: ActionTree<State, unknown> = {
    login({ commit }, form) {
      return new Promise<string>((resolve, reject) => {
        axios
          .post('./api/user/login', form)
          .then((res) => {
            message.success('登陆成功');
            commit('saveUserInfo', res.data.data);
            const routerPath: {
              [index: string]: { path: string };
            } = {
              admin: {
                path: '/Teacher/userlist',
              },
              teacher: {
                path: '/Teacher/userlist',
              },
              student: {
                path: '/Student/home',
              },
            };
            router.push(routerPath[res.data.data.role]);
            resolve(res.data.data.role);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  };
}

export default new User();
