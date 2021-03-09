import Mock from 'mockjs';
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
import {
  getClassList, editClass, delClass, insertStudent,
} from './modules/classe';
import { changeUserSignatures, changePasswords } from './modules/public/userInfo';
import MockPath from './mock_api';

const mockPath = new MockPath();

console.log('mock');
Mock.setup({
  timeout: '10-1500',
});
// 登录模块
Mock.mock(mockPath.login, 'post', login);
Mock.mock(mockPath.getByCode, 'post', getByCode);
Mock.mock(mockPath.softConfig, 'get', getConfig);

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

export default Mock;
