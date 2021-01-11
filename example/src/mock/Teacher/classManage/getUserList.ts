import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';

function getUserList(data: AjaxDate) {
  const { pageNo, pageSize } = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest(
      {
        pageNo,
        pageSize,
        totalPages: 10,
        totalRecords: 100,
        'list|10': [
          {
            // 账号
            code: '@id',
            // 头像
            headImagePath: "@image('50x50', '#50B347', '#FFF', '头像')",
            // 名称
            name: '@ctitle(3,5)',
            // 创建时间
            createTime: '@datetime',
            // 是否禁用
            disable: true,
            // 是否为管理员
            admin: true,
            // 是否为学生
            student: true,
            // 是否为教师
            teacher: true,
          },
        ],
      },
      null,
      true,
    ),
  );
}

function resetPassword() {
  return Mock.mock(new MockRequest({}, null, true));
}

function delteTeacher() {
  return Mock.mock(new MockRequest({}, null, true));
}

function changeUserName() {
  return Mock.mock(new MockRequest({}, null, true));
}

function createUser() {
  return Mock.mock(new MockRequest({}, null, true));
}

export {
  getUserList, resetPassword, delteTeacher, changeUserName, createUser,
};
