import Mock from 'mockjs';
import MockRequest from '../../MockRequest';

function getCode() {
  return Mock.mock(
    new MockRequest(
      {
        // 账号
        code: '@id',
        // 创建时间
        createTime: '@datetime',
        // 是否禁用
        disable: false,
        // 头像
        headImagePath: "@image('50x50', '#50B347', '#FFF', '头像')",
        // 名称
        name: '@ctitle(3,5)',
        // 个人简介
        personalSignature: '@sentence(3, 5)',
        // 是否为学生
        student: false,
        // 是否为管理员
        admin: true,
        // 是否为教师
        teacher: true,
      },
      null,
      true,
    ),
  );
}

function changeUserSignatures() {
  return Mock.mock(new MockRequest({}, null, true));
}
function changePasswords() {
  return Mock.mock(new MockRequest({}, null, true));
}

export { getCode, changeUserSignatures, changePasswords };
