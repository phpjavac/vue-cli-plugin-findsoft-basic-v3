import Mock from './index';
import {
  getByCode, login, getStudentList, delteStudent,
  getUserList,
  resetPassword,
  delteTeacher,
  changeUserName,
  createUser,
} from './modules/user';
import {
  getClassList, editClass, delClass, insertStudent,
} from './modules/classe';
import { changeUserSignatures, changePasswords } from './modules/public/userInfo';

export default class MockPath {
    login = './api/user/login';

    getByCode = './api/user/getByCode';

    getClassList = './api/class/queryClass'

    editClass = './api/class/createOrUpdateClass'

    delClass = './api/userManage/delClass'

    insertStudent = './api/classMember/insertStudent'

    getUserList = './api/user/queryUserList'

    getStudentList = './api/classMember/listStudent'

    resetPassword = './api/user/adminResetPassword'

    delteTeacher = './api/userManage/delTeacher'

    delteStudent = './api/userManage/delStudent'

    changeUserName = './api/user/changeUserInfo'

    createUser = './api/classMember/createClassMember'

    changeUserSignatures = './api/user/changeUserSignature'

    changePasswords = './api/user/changePassword'
}

const mockPath = new MockPath();
// 登录模块
Mock.mock(mockPath.login, 'post', login);
Mock.mock(mockPath.getByCode, 'post', getByCode);

// 班级模块
Mock.mock(mockPath.getClassList, 'post', getClassList);
Mock.mock(mockPath.editClass, 'post', editClass);
Mock.mock(mockPath.delClass, 'post', delClass);
Mock.mock(mockPath.insertStudent, 'post', insertStudent);

// 教师列表
Mock.mock(mockPath.getUserList, 'post', getUserList);
// 学生列表
Mock.mock(mockPath.getStudentList, 'post', getStudentList);
// 获取班级列表
// Mock.mock('./api/class/queryClass', 'post', getClassList);
// 重置密码
Mock.mock(mockPath.resetPassword, 'post', resetPassword);
// 删除教师
Mock.mock(mockPath.delteTeacher, 'post', delteTeacher);
// 删除学生
Mock.mock(mockPath.delteStudent, 'post', delteStudent);
// 编辑用户姓名
Mock.mock(mockPath.changeUserName, 'post', changeUserName);
// 添加用户
Mock.mock(mockPath.createUser, 'post', createUser);
// 获取用户信息
// Mock.mock('./api/user/getByCode', 'post', getCode);
// 更改个人信息
Mock.mock(mockPath.changeUserSignatures, 'post', changeUserSignatures);
// 修改密码
Mock.mock(mockPath.changePasswords, 'post', changePasswords);
