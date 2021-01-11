import axios from '@/axios/fetch';
import MockPath from '@/mock/mock_api';

const mockpath = new MockPath();
class Api {
    VUE_APP_MOCK = process.env.VUE_APP_MOCK === '1'

    /**
     * 登录接口
     * @param data 登录信息
     */
    login = (data: unknown) => {
      console.log(this.VUE_APP_MOCK);
      let path = './api/user/login';
      if (this.VUE_APP_MOCK) {
        path = mockpath.login;
      }
      return axios
        .post(path, data);
    }

    /**
     * 获取用户信息
     */
    getByCode = () => axios.post(this.VUE_APP_MOCK ? mockpath.getByCode : './api/user/getByCode', {
      code: sessionStorage.code,
    })

    /**
     * 修改用户信息
     * @param formData 用户信息
     */
    changeUserInfo = (formData: unknown) => axios.post('./api/user/changeUserInfo', formData)

    /**
     * 创建班级
     * @param formData 创建班级信息
     */
    createClassMember = (formData: unknown) => axios.post('./api/classMember/createClassMember', formData)

    /**
     * 查询用户列表
     * @param searchData 查询条件
     */
    queryUserList = (searchData: unknown) => axios.post('./api/user/queryUserList', searchData)

    /**
     * 查询学生列表
     * @param searchData
     */
    queryStudentList = (searchData: unknown) => axios.post('./api/classMember/listStudent', searchData)

    /**
     * 重置用户密码
     * @param BaseUserCodeRequest code
     */
    adminResetPassword = (BaseUserCodeRequest: string) => axios.post('./api/user/adminResetPassword', { code: BaseUserCodeRequest })

    /**
     * 删除学生
     * @param formData
     */
    delStudent = (formData: unknown) => axios.post('./api/userManage/delStudent', formData)

    /**
     * 删除教师
     * @param formData
     */
    delTeacher = (formData: unknown) => axios.post('./api/userManage/delTeacher', formData)
}

export default new Api();
