import {
  ActionTree, MutationTree, StoreOptions,
} from 'vuex';
import axios from '@/axios/fetch';
import { definitions } from '@/types/api';

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
      this.teacherCodes = JSON.stringify([data.teacherId]); // api need
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
      // record：这里可以区分教师和管理员，但是接口已经自己处理了。
      this.keyWord = data.keyWord;
      this.pageNo = data.pageNo;
      this.pageSize = data.pageSize;
      this.seqAsc = data.sortDesc;
      if (data.sortName) {
        if (data.sortName === 'teacherId') {
          this.seqColumn = 'teacherCodes';
        } else if (data.sortName === 'number') {
          this.seqColumn = 'stuNum';
        } else if (data.sortName === 'teacherName') {
          this.seqColumn = 'userNames';
        } else {
          this.seqColumn = data.sortName;
        }
      }
    }
}

// 暂时没找到暴露的interface，先从antd官网文档扒过来
export interface Afile {
    uid: string; // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
    name: string; // 文件名
    status: 'uploading'|'done'|'error'|'removed'; // 状态有：uploading done error removed
    response: {}; // '{"status": "success"}', // 服务端响应内容
    linkProps: {}; // '{"download": "image"}', // 下载链接额外的 HTML 属性
    xhr: XMLHttpRequest;// 'XMLHttpRequest{ ... }', // XMLHttpRequest Header
    originFileObj: File; // 文件对象
  }

class State {
  // user: definitions['User'] = {}
}

class UserInfo implements StoreOptions<State> {
    namespaced = true;

    state = new State();

    mutations: MutationTree<State> ={
    //   updateSearchForm(state, data) {
    //     state.searchForm = data;
    //   },
    }

    actions: ActionTree<State, unknown> = {
      // 班级列表
    //   getClassList({ commit }, data) {
    //     const searchData = new SearchClassClass(data);
    //     return new Promise((resolve) => {
    //       axios.post('./api/class/queryClass', searchData).then((res) => {
    //         commit('updateClassList', res.data.data.list || []);
    //         resolve(res.data.data);
    //       });
    //     });
    //   },
    //
    }
}

export default new UserInfo();
