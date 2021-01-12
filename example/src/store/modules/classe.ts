import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';
import axios from '@/axios/api';
import { definitions } from '@/types/api';
import { BaseSearchFace } from '@/types/base';
import { EditClassFace, SearchClassClass } from '@/types/modules/classe';

class State {
  // search
  searchForm: BaseSearchFace = {}

  // list
  tableClassList: EditClassFace[] = [] // 班级列表

  classInfo: EditClassFace = { name: '' } // 班级详情

  // tableStudentList: EditStudentFace[] = [] // 学生列表——模态框用

  // loading
  loadingClassList = false // 班级列表

  loadingStudentList = false // 学生明细列表

  // modal
  modalClassEdit = false // 班级编辑

  modalClassAdd = false // 班级新增

  modalStudentList = false // 学生明细list

  // modalStudentEdit = false // 学生编辑

  // modalStudentAdd = false // 学生新增
}

class Classe implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> ={
    // search
    updateSearchForm(state, data) {
      state.searchForm = data;
    },
    // list
    updateClassList(state, data: definitions['Class'][]) {
      state.tableClassList = data.map((v) => {
        const i: EditClassFace = {
          id: v.id,
          name: v.name || '',
          number: v.stuNum,
          remark: v.remarks,
          teacherName: v.userNames,
          teacherId: v.teacherCodes,
        };
        return i;
      });
    },
    updateClassInfo(state, info: EditClassFace) {
      state.classInfo = info;
    },
    // loading & modal
    changeBoolean(state, data) {
      state[data.name as keyof typeof state] = data.type;
    },
  }

  actions: ActionTree<State, unknown> = {
    // 班级列表
    getClassList({ commit }, data) {
      commit('updateClassList', []);
      const searchData = new SearchClassClass(data);
      searchData.setKeyWord(data.keyWord);
      return new Promise((resolve) => {
        axios.getClassList(searchData).then((res) => {
          commit('updateClassList', res.data.data.list || []);
          resolve(res.data.data);
        });
      });
    },

    // 新增编辑 班级
    editClassData(_: unknown, data: EditClassFace) {
      const formData: definitions['MergeClassRequest'] = {
        id: data.id,
        name: data.name,
        remarks: data.remark,
        disable: data.disable,
        teacherCodes: JSON.stringify([data.teacherId]),
      };
      return new Promise((resolve, reject) => {
        axios.editClassData(formData).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    /**
     * @description 班级删除 批量删除
     * @param ids [id] 或 [id1, id2]
     */
    delClass(_: unknown, ids) {
      const formData = { classIds: JSON.stringify(ids) };
      return new Promise((resolve) => {
        axios.delClass(formData).then((res) => {
          resolve(res.data.data);
        });
      });
    },

    // 学生导入
    uploadStudentByClass(_: unknown, data: {classId: string; file: File}) {
      const { classId, file } = data;
      const formData = new FormData();
      formData.append('classId', classId);
      formData.append('file', file);
      return new Promise((resolve) => {
        axios.uploadStudentByClass(formData, classId).then((res) => {
          resolve(res);
        });
      });
    },

  }
}

export default new Classe();
