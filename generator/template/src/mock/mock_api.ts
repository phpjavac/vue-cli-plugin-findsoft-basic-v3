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
    login = './mock/user/login';

    getByCode = './mock/user/getByCode';

    getClassList = './mock/class/queryClass'

    editClass = './mock/class/createOrUpdateClass'

    delClass = './mock/userManage/delClass'

    insertStudent = './mock/classMember/insertStudent'

    getUserList = './mock/user/queryUserList'

    getStudentList = './mock/classMember/listStudent'

    resetPassword = './mock/user/adminResetPassword'

    delteTeacher = './mock/userManage/delTeacher'

    delteStudent = './mock/userManage/delStudent'

    changeUserName = './mock/user/changeUserInfo'

    createUser = './mock/classMember/createClassMember'

    changeUserSignatures = './mock/user/changeUserSignature'

    changePasswords = './mock/user/changePassword'
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
// 更改个人信息
Mock.mock(mockPath.changeUserSignatures, 'post', changeUserSignatures);
// 修改密码
Mock.mock(mockPath.changePasswords, 'post', changePasswords);
