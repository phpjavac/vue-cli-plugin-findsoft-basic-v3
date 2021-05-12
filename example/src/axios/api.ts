import axios from '@/axios/fetch';
import MockPath from '@/mock/mock_api';
import { ReqConfig, ClassKey } from '@/types/base';

const mockpath = new MockPath();

class Api {
  VUE_APP_MOCK = false;

  constructor(VUE_APP_MOCK: boolean) {
    this.VUE_APP_MOCK = VUE_APP_MOCK;
  }

  /**
   * 登录接口
   * @param data 登录信息
   */
  login = (data: unknown, c?: ReqConfig) => {
    let path = './api/user/login';
    if (this.VUE_APP_MOCK) {
      path = mockpath.login;
    }
    return axios.post(path, data, c);
  };

  softConfig = (c?: ReqConfig) =>
    axios.get(this.VUE_APP_MOCK ? mockpath.softConfig : './softConfig/get', c);

  /**
   * 获取用户信息
   */
  getByCode = (c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.getByCode : './api/user/getByCode',
      {
        code: sessionStorage.code,
      },
      c,
    );

  /**
   * 修改用户信息
   * @param formData 用户信息
   */
  changeUserInfo = (formData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.changeUserName : './api/user/changeUserInfo',
      formData,
      c,
    );

  /**
   * 创建学生&教师
   * @param formData 创建学生&教师
   */
  createClassMember = (formData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.createUser : './api/classMember/createClassMember',
      formData,
      c,
    );

  /**
   * 查询用户列表
   * @param searchData 查询条件
   */
  queryUserList = (searchData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.getUserList : './api/user/queryUserList',
      searchData,
      c,
    );

  /**
   * 查询学生列表
   * @param searchData
   */
  queryStudentList = (searchData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.getStudentList : './api/classMember/listStudent',
      searchData,
      c,
    );

  /**
   * 重置用户密码
   * @param BaseUserCodeRequest code
   */
  adminResetPassword = (BaseUserCodeRequest: string, c?: ReqConfig) =>
    axios.post(this.VUE_APP_MOCK ? mockpath.resetPassword : './api/user/adminResetPassword', {
      code: BaseUserCodeRequest,
      c,
    });

  /**
   * 删除学生
   * @param formData
   */
  delStudent = (formData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.delteStudent : './api/userManage/delStudent',
      formData,
      c,
    );

  /**
   * 删除教师
   * @param formData
   */
  delTeacher = (formData: unknown, c?: ReqConfig) =>
    axios.post('./api/userManage/delTeacher', formData, c);

  /**
   * 更改个人信息
   * @param formData
   */
  changeUserSignature = (formData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.changeUserSignatures : './api/user/changeUserSignature',
      formData,
      c,
    );

  /**
   * 修改密码
   * @param formData
   */
  changePassword = (formData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.changePasswords : './api/user/changePassword',
      formData,
      c,
    );

  /**
   * 查询班级列表
   * @param searchData
   */
  getClassList = (searchData: unknown, c?: ReqConfig) =>
    axios.post(this.VUE_APP_MOCK ? mockpath.getClassList : './api/class/queryClass', searchData, c);

  /**
   * 编辑&创建班级
   * @param formData
   */
  editClassData = (formData: unknown, c?: ReqConfig) =>
    axios.post(
      this.VUE_APP_MOCK ? mockpath.editClass : './api/class/createOrUpdateClass',
      formData,
      c,
    );

  /**
   * 删除班级
   * @param formData
   */
  delClass = (formData: unknown, c?: ReqConfig) =>
    axios.post(this.VUE_APP_MOCK ? mockpath.delClass : './api/userManage/delClass', formData, c);

  /**
   * 导入学生——没有处理mock
   * @param formData
   * @param classId 班级id
   */
  uploadStudentByClass = (formData: unknown, classId: string, c?: ReqConfig) =>
    axios.post(`./api/classMember/insertStudent?classId=${classId}`, formData, c);
}

type ApiUrlType = ClassKey<Api>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const obj = {} as any;
Object.keys(new Api(process.env.VUE_APP_MOCK === '1')).forEach((k: string) => {
  obj[k] = k;
});
Object.freeze(obj); // 只读

/**
 * 根据接口类生成接口的 k，v 对象
 * @example { getStudents: 'getStudents'}
 */
export class ApiUrl {
  public static readonly Urls = obj as ApiUrlType;
}

export default new Api(process.env.VUE_APP_MOCK === '1');
