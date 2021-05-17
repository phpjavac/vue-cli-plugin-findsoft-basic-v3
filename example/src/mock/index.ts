/* eslint-disable @typescript-eslint/no-explicit-any */
import Mock from 'mockjs';
import Urls from '@/axios/urls';
import { AxiosRequestConfig } from 'axios';
import { ClassKey, ReqConfig } from '@/types/base';
import {
  getByCode,
  login,
  getStudentList,
  delteStudent,
  getConfig,
  getUserList,
  resetPassword,
  delteTeacher,
  changeUserName,
  createUser,
} from './modules/user';
import { getClassList, editClass, delClass } from './modules/classe';
import { changeUserSignatures, changePasswords } from './modules/public/userInfo';

class MockRouter implements ClassKey<Urls> {
  login = login;

  softConfig = getConfig;

  getByCode = getByCode;

  changeUserInfo = changeUserName;

  createClassMember = createUser;

  queryUserList = getUserList;

  queryStudentList = getStudentList;

  adminResetPassword = resetPassword;

  delStudent = delteStudent;

  delTeacher = delteTeacher;

  changeUserSignature = changeUserSignatures;

  changePassword = changePasswords;

  getClassList = getClassList;

  editClassData = editClass;

  delClass = delClass;

  uploadStudentByClass: any;

  constructor() {
    Mock.setup({
      timeout: '10-1500',
    });
    const urls = new Urls();
    let useMock = process.env.VUE_APP_MOCK === '1';
    Object.keys(urls).forEach((k) => {
      const config: ReqConfig = (urls as any)[k]();
      if (config.useMock !== undefined) useMock = config.useMock;
      if (useMock) {
        Mock.mock(config.url, config.method, (this as any)[k]);
      }
    });
    console.log(Mock);
  }

  // eslint-disable-next-line class-methods-use-this
  public getData(config: AxiosRequestConfig) {
    return config;
  }
}

// eslint-disable-next-line no-new
export { MockRouter };
export default Mock;
