import { definitions } from '../api';
import { BaseSearchClass, BaseSearchFace } from '../base';

export interface UserInfo{
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

export interface StudentFace extends EditUserFace{
  className?: string;
  teacherName?: string;
}

interface StudentModalFace extends BaseSearchFace{
  classId?: string;
}

// 教师的查询接口 api条件比较特殊，用class限制一下
export class SearchUserClass extends BaseSearchClass {
  queryParam?: definitions['QueryUserParam'] // 查询教师——参数

  teacherId?: string // 查询学生——主列表参数

  classRoom_uuid?: string // ——模态框列表参数

  setQueryParam(queryParam: BaseSearchFace) {
    this.queryParam = {};
    (this.queryParam as definitions['QueryUserParam']).role = 1;
    (this.queryParam as definitions['QueryUserParam']).name = queryParam.keyWord;
  }

  setTeacherId() {
    // 教师查询学生的时候，要有自己code的限制
    if (sessionStorage.getItem('role') !== 'admin') {
      this.teacherId = sessionStorage.getItem('code') || '';
    }
  }

  constructor(data: StudentModalFace) {
    super(data);
    // eslint-disable-next-line @typescript-eslint/camelcase
    if (data.classId) this.classRoom_uuid = data.classId;
  }
}
