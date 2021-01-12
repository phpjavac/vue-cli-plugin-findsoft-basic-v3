import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../MockRequest';

class LoginClass {
  code = ''

  name = Mock.Random.cname()

  role = ''

  token = new Date().getTime().toString()

  constructor(code: string) {
    this.code = code;
    this.role = code;
  }
}
const loginMap = new Map();
loginMap.set('admin', new LoginClass('admin'));
loginMap.set('teacher', new LoginClass('teacher'));
loginMap.set('student', new LoginClass('student'));

class UserInfo extends LoginClass {
  createTime = Mock.Random.datetime();

  disable = false;

  headImagePath = Mock.Random.image('64x64');

  admin = false

  teacher = false

  student = false

  constructor(code: string) {
    super(code);
    this.code = code;
    this.role = code;
    this.admin = code === 'admin';
    this.teacher = code === 'teacher';
    this.student = code === 'student';
  }
}

// 登录
export function getByCode(data: AjaxDate) {
  const { code } = JSON.parse(data.body);
  return new MockRequest(
    new UserInfo(code),
    '用户信息', true,
  );
}

export function login(data: AjaxDate) {
  const { code } = JSON.parse(data.body);
  let loginData;
  if (['admin', 'teacher', 'student'].includes(code)) {
    loginData = new MockRequest(loginMap.get(code), '登录成功', true);
  } else {
    loginData = new MockRequest(null, '账号或密码不正确', false);
  }
  return loginData;
}

// 学生
export function getStudentList(data: AjaxDate) {
  const { pageNo, pageSize } = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest(
      {
        pageNo,
        pageSize,
        // totalPages: 10,
        totalRecords: 100,
        [`list|${pageSize}`]: [
          {
            // 用户id
            userId: '@id',
            // 用户名称
            name: '@ctitle(3,5)',
            // 教师账号
            teacherCodes: '@id',
            // 教师名称
            teacherNames: '@ctitle(3,5)',
            // 头像
            headPath: "@image('50x50', '#50B347', '#FFF', '头像')",
            // 班级id
            classId: '@guid',
            // 班级名称
            className: '@ctitle(3,5)',
            // 是否禁用
            disable: true,
            // classMemberPK
            classMemberPk: {
              classId: '@guid',
              userId: '@id',
            },
          },
        ],
      },
      null,
      true,
    ),
  );
}

export function delteStudent() {
  return Mock.mock(new MockRequest({}, null, true));
}

export function changeStudentName() {
  return Mock.mock(new MockRequest({}, null, true));
}

//
export function getUserList(data: AjaxDate) {
  const { pageNo, pageSize } = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest(
      {
        pageNo,
        pageSize,
        // totalPages: 10,
        totalRecords: 100,
        [`list|${pageSize}`]: [
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

export function resetPassword() {
  return Mock.mock(new MockRequest({}, null, true));
}

export function delteTeacher() {
  return Mock.mock(new MockRequest({}, null, true));
}

export function changeUserName() {
  return Mock.mock(new MockRequest({}, null, true));
}

export function createUser() {
  return Mock.mock(new MockRequest({}, null, true));
}
