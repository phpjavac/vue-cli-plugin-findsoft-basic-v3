// import { definitions } from '@/types/api';
import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';
import axios from '@/axios/fetch';
import { definitions } from '@/types/api';
import { EditStudentFace } from './student';

export interface EditClassFace {
  // form
  id?: string; //
  name?: string; // 班级名称
  remark?: string; //
  disable?: boolean; //
  teacherId?: string; // 教师Id
  // list
  number?: number; // 班级人数
  teacherName?: string; // 教师姓名
}
class EditClassClass {
  id?: string

  name?: string

  disable?: boolean

  remarks?: string

  teacherCodes?: string;

  constructor(data: EditClassFace) {
    this.id = data.id;
    this.name = data.name;
    this.remarks = data.remark;
    this.disable = data.disable;
    this.teacherCodes = data.teacherId;
  }
}

export interface SearchClassFace{
  keyWord?: string; // 关键字模糊
  // base
  pageNo?: number;
  pageSize?: number;
  sortDesc?: boolean;
  sortName?: string;
}
class SearchClassClass {
  keyWord?: string; // 关键字模糊

  name?: string; // 班级名

  id?: string; //

  // base
  pageNo?: number;

  pageSize?: number;

  seqAsc?: boolean;

  seqColumn?: string;

  constructor(data: SearchClassFace) {
    this.keyWord = data.keyWord;
    this.pageNo = data.pageNo;
    this.pageSize = data.pageSize;
    this.seqAsc = data.sortDesc;
    this.seqColumn = data.sortName;
  }
}

class State {
  // search
  searchForm: SearchClassFace = {}

  // list
  tableClassList: EditClassFace[] = [] // 班级列表

  tableStudentList: EditStudentFace[] = [] // 学生列表

  // loading
  loadingClassList = false // 班级列表

  loadingStudentList = false // 学生明细列表

  // modal
  modalClassEdit = false // 班级编辑

  modalClassAdd = false // 班级新增

  modalStudentList = false // 学生明细list

  modalStudentEdit = false // 学生编辑

  modalStudentAdd = false // 学生新增
}

class ClassController implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> ={
    // search
    updateSearchForm(state, data) {
      state.searchForm = data;
    },
    // table
    updateClassList(state, data: definitions['Class'][]) {
      state.tableClassList = data.map((v) => {
        const i: EditClassFace = {
          id: v.id,
          name: v.name,
          number: v.stuNum,
          teacherName: v.userNames,
          teacherId: v.teacherCodes,
        };
        return i;
      });
    },
    // loading & modal
    changeBoolean(state, data) {
      state[data.name as keyof typeof state] = data.type;
    },
  }

  actions: ActionTree<State, unknown> = {
    // 班级列表
    getClassList({ commit }, data) {
      // commit('changeBoolean', { name: 'loadingClassList', type: true });
      const searchData = new SearchClassClass(data);
      return new Promise((resolve) => {
        axios.post('./api/class/queryClass', searchData).then((res) => {
          // console.log(res.data.data, 'resssss');
          commit('updateClassList', res.data.data.list || []);
          resolve(res.data.data);
        }).finally(() => {
          console.log('finally');
          // commit('changeBoolean', { name: 'loadingClassList', type: false });
        });
      });
    },

    // 新增编辑 班级
    editClassData(_: unknown, data) {
      const formData = new EditClassClass(data);
      return new Promise((resolve, reject) => {
        axios.post('./api/class/createOrUpdateClass', formData).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

  }
}

export default new ClassController();
