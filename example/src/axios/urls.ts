/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReqConfig } from '@/types/base';

/**
 * api请求配置类，在此添加新的请求配置后需要同步更改Api 和 MockRoute类
 */
class Urls {
  /**
   * 登录接口
   * @param data 登录信息
   */
  login = (data: any): ReqConfig => ({
    url: './api/user/login',
    method: 'post',
    useMock: true,
    data,
  });

  /**
   * 获取软件配置信息
   */
  softConfig = (): ReqConfig => ({
    url: './softConfig/get',
    method: 'get',
    useMock: true,
  });

  /**
   * 获取用户信息
   */
  getByCode = (): ReqConfig => ({
    url: './api/user/getByCode',
    method: 'post',
    data: {
      code: sessionStorage.getItem('code'),
    },
    useMock: true,
  });

  /**
   * 修改用户信息
   * @param formData 用户信息
   */
  changeUserInfo = (formData: unknown): ReqConfig => ({
    url: './api/user/changeUserInfo',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 创建学生&教师
   * @param formData 创建学生&教师
   */
  createClassMember = (formData: unknown): ReqConfig => ({
    url: './api/classMember/createClassMember',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 查询用户列表
   * @param searchData 查询条件
   */
  queryUserList = (searchData: unknown): ReqConfig => ({
    url: './api/user/queryUserList',
    method: 'post',
    data: searchData,
    useMock: true,
  });

  /**
   * 查询学生列表
   * @param searchData
   */
  queryStudentList = (searchData: unknown): ReqConfig => ({
    url: './api/classMember/listStudent',
    method: 'post',
    data: searchData,
    useMock: true,
  });

  /**
   * 重置用户密码
   * @param BaseUserCodeRequest code
   */
  adminResetPassword = (BaseUserCodeRequest: string): ReqConfig => ({
    url: './api/user/adminResetPassword',
    method: 'post',
    data: BaseUserCodeRequest,
    useMock: true,
  });

  /**
   * 删除学生
   * @param formData
   */
  delStudent = (formData: unknown): ReqConfig => ({
    url: './api/userManage/delStudent',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 删除教师
   * @param formData
   */
  delTeacher = (formData: unknown): ReqConfig => ({
    url: './api/userManage/delTeacher',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 更改个人信息
   * @param formData
   */
  changeUserSignature = (formData: unknown): ReqConfig => ({
    url: './api/user/changeUserSignature',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 修改密码
   * @param formData
   */
  changePassword = (formData: unknown): ReqConfig => ({
    url: './api/user/changePassword',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 查询班级列表
   * @param searchData
   */
  getClassList = (searchData: unknown): ReqConfig => ({
    url: './api/class/queryClass',
    method: 'post',
    data: searchData,
    useMock: true,
  });

  /**
   * 编辑&创建班级
   * @param formData
   */
  editClassData = (formData: unknown): ReqConfig => ({
    url: './api/class/createOrUpdateClass',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 删除班级
   * @param formData
   */
  delClass = (formData: unknown): ReqConfig => ({
    url: './api/userManage/delClass',
    method: 'post',
    data: formData,
    useMock: true,
  });

  /**
   * 导入学生——没有处理mock
   * @param formData
   * @param classId 班级id
   */
  uploadStudentByClass = (formData: unknown, classId: string): ReqConfig => ({
    url: './api/classMember/insertStudent',
    method: 'post',
    data: formData,
    params: {
      classId,
    },
    useMock: false,
  });
}

export default Urls;
