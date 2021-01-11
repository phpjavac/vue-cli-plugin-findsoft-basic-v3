import Mock from 'mockjs';

import { getDemoList } from './demo';

import {
  getUserList,
  resetPassword,
  delteTeacher,
  changeUserName,
  createUser,
} from './Teacher/classManage/getUserList';
import { getStudentList, delteStudent } from './Teacher/classManage/getStudentList';
import { getClassList } from './Teacher/classManage/getClassList';
import { getCode, changeUserSignatures, changePasswords } from './Teacher/public/userInfo';

Mock.setup({
  timeout: '500-1000',
});

Mock.mock('mock/demo', 'post', getDemoList);

// 教师列表
Mock.mock('./api/user/queryUserList', 'post', getUserList);
// 学生列表
Mock.mock('./api/classMember/listStudent', 'post', getStudentList);
// 获取班级列表
Mock.mock('./api/class/queryClass', 'post', getClassList);
// 重置密码
Mock.mock('./api/user/adminResetPassword', 'post', resetPassword);
// 删除教师
Mock.mock('./api/userManage/delTeacher', 'post', delteTeacher);
// 删除学生
Mock.mock('./api/userManage/delStudent', 'post', delteStudent);
// 编辑用户姓名
Mock.mock('./api/user/changeUserInfo', 'post', changeUserName);
// 添加用户
Mock.mock('./api/classMember/createClassMember', 'post', createUser);
// 获取用户信息
Mock.mock('./api/user/getByCode', 'post', getCode);
// 更改个人信息
Mock.mock('./api/user/changeUserSignature', 'post', changeUserSignatures);
// 修改密码
Mock.mock('./api/user/changePassword', 'post', changePasswords);
