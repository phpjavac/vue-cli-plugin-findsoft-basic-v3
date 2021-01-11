import Mock from 'mockjs';

import { getDemoList } from './demo';
import { getByCode, login } from './modules/user';
import {
  getClassList, editClass, delClass, insertStudent,
} from './modules/classe';

Mock.setup({
  timeout: '500-1000',
});

Mock.mock('mock/demo', 'post', getDemoList);

// 用户模块
Mock.mock('./api/user/login', 'post', login);
Mock.mock('./api/user/getByCode', 'post', getByCode);

// 班级模块
Mock.mock('./api/class/queryClass', 'post', getClassList);
Mock.mock('./api/class/createOrUpdateClass', 'post', editClass);
Mock.mock('./api/userManage/delClass', 'post', delClass);
Mock.mock('./api/classMember/insertStudent', 'post', insertStudent);
