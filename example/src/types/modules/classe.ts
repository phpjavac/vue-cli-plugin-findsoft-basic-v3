import { BaseSearchClass, BaseSearchFace } from '../base';

export interface EditClassFace {
  // form
  id?: string; //
  name: string; // 班级名称
  remark?: string; //
  disable?: boolean; //
  teacherId?: string; // 教师Id
  // list
  number?: number; // 班级人数
  teacherName?: string; // 教师姓名
}

export class SearchClassClass extends BaseSearchClass {
  // keyWord,pageNo,pageSize,seqAsc,seqColumn 改为从基础类继承

  name?: string; // 班级名

  id?: string; //

  constructor(data: BaseSearchFace) {
    super(data);
    if (data.sortName) {
      this.seqAsc = data.sortDesc;
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
