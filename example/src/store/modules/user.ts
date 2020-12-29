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
/**
 * 理论上这里是否继承UserInfo都不影响，但考虑面向对象，先继承试试。如果不合适也方便更改。
 * 目前只用到了UserInfo的name&code
 */
export interface EditUserFace extends UserInfo{
  id?: string; // 用户id
  // name: string; // 用户姓名 extends
  // code: string; // 账号 extends
  classId?: string; // 班级id
  isTeacher?: boolean; // 是否教师
}
/**
 * 对Class而言，现在主要作用是作为转换器&过滤器，即去除表单无用字段&转换列表所需字段
 */
class EditUserClass {
  userId?: string

  classId?: string;

  name?: string

  isTeacher?: boolean

  constructor(data: EditUserFace) {
    this.userId = data.id;
    this.classId = data.classId;
    this.name = data.name;
    this.isTeacher = data.isTeacher;
  }
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
    // 添加用户 学生&教师
    createUser(_: unknown, data) {
      const formData = new EditUserClass(data);
      return new Promise((resolve, reject) => {
        axios.post('./api/classMember/createClassMember', formData).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

  };
}

export default new User();
