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
// 用户列表没有token，暂时先不继承UserInfo interface
export interface EditUserFace{
  id?: string; // 用户id
  name?: string; // 用户姓名
  code?: string; // 账号
  classId?: string; // 班级id

  isTeacher?: boolean; //
}
/**
 * 作为转换器&过滤器，即去除表单无用字段&转换列表所需字段
 */
class EditUserClass {
  userId?: string

  classId?: string;

  name?: string

  isTeacher?: boolean // api need

  constructor(data: EditUserFace) {
    this.userId = data.id;
    this.classId = data.classId;
    this.name = data.name;
    this.isTeacher = data.isTeacher;
  }
}
export interface StudentFace extends EditUserFace{
  className?: string;
  teacherName?: string;
}

class State {
  user: definitions['User'] = {}

  teacherData: EditUserFace[] = []

  studentData: StudentFace[] = []
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
    updateTeacherList(store, userList: definitions['User'][]) {
      store.teacherData = userList.map((v: definitions['User']) => {
        const item = {
          // id: v.id,
          code: v.code,
          name: v.name,
        };
        return item;
      });
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
          resolve(user.data.data);
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
    // 教师列表
    getTeacherList({ commit }: { commit: Commit }, QueryUserRequest: definitions['QueryUserRequest']) {
      // 先记一下，这里先用role控制一下。后面处理教师列表，需要用interface和class完善查询条件
      (QueryUserRequest.queryParam as definitions['QueryUserParam']).role = 1;
      return new Promise((resolve, reject) => {
        axios.post('./api/user/queryUserList', QueryUserRequest).then((res) => {
          const { data } = res.data;
          commit('updateTeacherList', data.list || []);
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 学生列表
    getStudentList({ commit }: { commit: Commit }, ListClassMemberRequest: definitions['ListClassMemberRequest']) {
      return new Promise((resolve, reject) => {
        axios.post('./api/classMember/listStudent', ListClassMemberRequest).then((res) => {
          const { data } = res.data;
          commit('updateStudentList', data.list || []);
          resolve(data);
        }).catch((err) => {
          reject(err);
          console.log(err);
        });
      });
    },

  };
}

export default new User();
