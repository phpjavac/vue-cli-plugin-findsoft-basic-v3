import { Moment } from 'moment';

/**
 * 学生接口
 */
export interface IClassMember {
  /** 学生姓名 */
  name: string;
  /**
   * 学生id
   */
  userId: string;
  /**
   * 选中状态
   */
  checked: boolean;
}

/**
 * 班级接口
 */
export interface IClass {
  checked: boolean;
  indeterminate: boolean;
  disable?: boolean;
  id: string;
  name: string;
  remarks?: string;
  stuNum: number;
  teacherCode: string;
  vipClass?: boolean;
  classMemberList: IClassMember[];
}

/**
 * 班级类
 */
export class Class implements IClass {
  constructor(cls?: IClass) {
    Object.assign(this, cls);
  }

  checked = false;

  indeterminate = false;

  disable = false;

  id = '';

  name = '';

  remarks = '';

  stuNum = 0;

  teacherCode = '';

  vipClass = false;

  classMemberList = [];
}
export interface IMemberReq {
  userId: string;
}

export interface IExperimentClassReq {
  memberReqList: IMemberReq[];
  classId: string;
  teacherId?: string;
}

/**
 * 分配实验表单
 */
export interface IDistributeForm {
  caseId: string;
  caseName: string;
  endTime: null | Moment | string;
  experimentClassReqs: IExperimentClassReq[];
  runStageTotalTime: number;
  startTime: null | Moment | string;
  viewAnswer: boolean;
  viewReport: boolean;
}

export class DistributeForm implements IDistributeForm {
  constructor(dForm?: Partial<IDistributeForm>) {
    Object.assign(this, dForm);
  }

  caseId = '';

  caseName = '';

  endTime = null;

  experimentClassReqs = [];

  runStageTotalTime = 20;

  startTime = null;

  viewAnswer = false;

  viewReport = false;
}
