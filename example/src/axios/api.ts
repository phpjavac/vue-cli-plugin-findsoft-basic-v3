/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/axios/fetch';
import { ClassKey } from '@/types/base';
import { AxiosResponse } from 'axios';
import Urls from './urls';

class Api implements ClassKey<Urls, (...T: any) => Promise<AxiosResponse>> {
  urls: Urls;

  constructor() {
    this.urls = new Urls();
  }

  softConfig: (...T: any) => Promise<AxiosResponse<any>> = () =>
    axios.request(this.urls.softConfig());

  getByCode: (...T: any) => Promise<AxiosResponse> = () => axios.request(this.urls.getByCode());

  changeUserInfo: (...T: any) => Promise<AxiosResponse> = (formData) =>
    axios.request(this.urls.changeUserInfo(formData));

  createClassMember: (...T: any) => Promise<AxiosResponse> = (formData) =>
    axios.request(this.urls.createClassMember(formData));

  queryUserList: (...T: any) => Promise<AxiosResponse> = (searchData) =>
    axios.request(this.urls.queryUserList(searchData));

  queryStudentList: (...T: any) => Promise<AxiosResponse> = (searchData) =>
    axios.request(this.urls.queryStudentList(searchData));

  adminResetPassword: (...T: any) => Promise<AxiosResponse> = (baseUserCodeRequest) =>
    axios.request(this.urls.adminResetPassword(baseUserCodeRequest));

  delStudent: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.delStudent(data));

  delTeacher: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.delTeacher(data));

  changeUserSignature: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.changeUserSignature(data));

  changePassword: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.changePassword(data));

  getClassList: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.getClassList(data));

  editClassData: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.editClassData(data));

  delClass: (...T: any) => Promise<AxiosResponse> = (data) =>
    axios.request(this.urls.delClass(data));

  uploadStudentByClass: (T: any, classId: string) => Promise<AxiosResponse> = (data, classId) =>
    axios.request(this.urls.uploadStudentByClass(data, classId));

  login = (data: any) => axios.request(this.urls.login(data));
}

type ApiUrlType = ClassKey<Api>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const obj = {} as any;
Object.keys(new Api()).forEach((k: string) => {
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

export default new Api();
