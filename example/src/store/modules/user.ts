import {
  ActionTree, Commit, MutationTree, StoreOptions,
} from 'vuex';
import axios from '@/axios/fetch';
import { message } from 'ant-design-vue';
import { definitions } from '@/types/api';
import router from '../../router/index';

interface UserInfo{
  role: string;
  name: string;
  code: string;
  token: string;
}
class State {
  user: definitions['User'] = {}
}

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
    pulUser(store, user: definitions['User']) {
      store.user = user;
    },
  };

  actions: ActionTree<State, unknown> = {
    login({ commit, dispatch }, form) {
      return new Promise<string>((resolve, reject) => {
        axios
          .post('./api/user/login', form)
          .then(async (res) => {
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
            await dispatch('getByCode');
            router.push(routerPath[res.data.data.role]);
            resolve(res.data.data.role);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取用户个人信息
    getByCode({ commit }: { commit: Commit }) {
      return new Promise<void>((resolve, reject) => {
        axios.post('./api/user/getByCode', {
          code: sessionStorage.code,
        }).then((user) => {
          const userInfo = user.data.data;
          commit('pulUser', userInfo);
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
  };
}

export default new User();
