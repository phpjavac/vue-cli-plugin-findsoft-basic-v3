import {
  ActionTree, Commit, GetterTree, MutationTree, StoreOptions,
} from 'vuex';
import axios from '@/axios/api';
import { message } from 'ant-design-vue';
import { definitions } from '@/types/api';
import {
  UserInfo, EditUserFace, StudentFace, SearchUserClass,
} from '@/types/modules/user';
import { BaseSearchFace } from '@/types/base';
import router from '../../router/index';

class State {
  // search
  searchForm: BaseSearchFace = {} // searchForm student&teacher common

  // list & info
  user: definitions['User'] = {}

  teacherData: EditUserFace[] = []

  studentData: StudentFace[] = []

  studentInfo: StudentFace = {}

  teacherInfo: EditUserFace = {}

  // loading
  loadingUserList = false // list-loading student&teacher common

  // modal
  modalTeacherEdit = false // 教师编辑

  modalTeacherAdd = false // 教师新增

  modalStudentEdit = false // 学生编辑

  modalStudentAdd = false // 学生新增
}

class User implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  getters: GetterTree<State, unknown> = {
    userInfo(state) {
      return state.user; // 现在获得getters的方式有点奇怪。用户模块写完要翻翻博客
    },
  };

  mutations: MutationTree<State> = {
    // list & info
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
    updateStudentList(store, userList: definitions['ClassMember'][]) {
      store.studentData = userList.map((v: definitions['ClassMember']) => {
        const item = {
          // id: v.id,
          code: v.userId,
          name: v.name,
          className: v.className,
          classId: v.classId,
          teacherName: v.teacherNames,
          teacherId: v.teacherCodes,
        };
        return item;
      });
    },
    updateTeacherInfo(state, info: EditUserFace) {
      state.teacherInfo = info;
    },
    updateStudentInfo(state, info: StudentFace) {
      state.studentInfo = info;
    },
    // search
    updateSearchForm(state, data) {
      state.searchForm = data;
    },
    // loading & modal
    changeBoolean(state, data) {
      state[data.name as keyof typeof state] = data.type;
    },
  };

  actions: ActionTree<State, unknown> = {
    login({ commit, dispatch }, form) {
      return new Promise<string>((resolve, reject) => {
        axios.login(form)
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
        axios.getByCode().then((user) => {
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
      const formData: definitions['CreateOrUpdateClassMemberRequest'] = {
        userId: data.code,
        classId: data.classId,
        name: data.name,
        isTeacher: data.isTeacher,
      };
      return new Promise((resolve, reject) => {
        axios.createClassMember(formData).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 更改用户信息——编辑用户&个人中心
    changeUserInfo(_: unknown, data) {
      const formData: definitions['ChangeUserInfoRequest'] = {
        code: data.code,
        name: data.name,
      };
      return new Promise((resolve, reject) => {
        axios.changeUserInfo(formData).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          message.error(err);
          reject(err);
        });
      });
    },
    // 教师列表
    getTeacherList({ commit }: { commit: Commit }, Querydata: BaseSearchFace) {
      commit('updateTeacherList', []);
      const searchData = new SearchUserClass(Querydata);
      searchData.setQueryParam(Querydata);
      return new Promise((resolve, reject) => {
        axios.queryUserList(searchData).then((res) => {
          const { data } = res.data;
          commit('updateTeacherList', data.list || []);
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 学生列表——按照v2版本的接口查询
    getStudentList({ commit }: { commit: Commit }, Querydata: BaseSearchFace) {
      commit('updateStudentList', []);
      const searchData = new SearchUserClass(Querydata);
      searchData.setKeyWord(Querydata.keyWord);
      searchData.setTeacherId();
      return new Promise((resolve, reject) => {
        axios.queryStudentList(searchData).then((res) => {
          const { data } = res.data;
          commit('updateStudentList', data.list || []);
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    // 重置用户密码为123456——teacher & student common
    resetPassword(_: unknown, BaseUserCodeRequest: string) {
      return new Promise((resolve, reject) => {
        axios.adminResetPassword(BaseUserCodeRequest).then((res) => {
          const { data } = res;
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 删除用户——type 0教师 1学生
    delUser(_: unknown, data: { type: number; ids: string[] }) {
      const formData = { userCodes: JSON.stringify(data.ids) };
      const queryFun = data.type ? axios.delStudent : axios.delTeacher;
      return new Promise((resolve, reject) => {
        queryFun(formData).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },

  };
}

export default new User();
