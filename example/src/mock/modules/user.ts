import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../MockRequest';

class LoginClass {
  code = ''

  name = '@cname'

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

class UserInfo {
  code = '';

  role =''

  name = '@cname';

  createTime = '@datetime()';

  disable = false;

  headImagePath = Mock.Random.image('64x64');

  constructor(code: string) {
    this.code = code;
    this.role = code;
  }
}

// 示例
export function getByCode(data: AjaxDate) {
  const { code } = JSON.parse(data.body);
  return new MockRequest(
    new UserInfo(code),
    '用户信息', true,
  );
}

export function login(data: AjaxDate) {
  const { code, password } = JSON.parse(data.body);
  let loginData;
  console.log('请求参数', code, password);
  if (['admin', 'teacher', 'student'].includes(code)) {
    loginData = new MockRequest(loginMap.get(code), '登录成功', true);
  } else {
    loginData = new MockRequest(null, '账号或密码不正确', false);
  }
  return loginData;
}
