import Mock from 'mockjs';

import { getDemoList } from './demo';

Mock.setup({
  timeout: '500-1000',
});

Mock.mock('mock/demo', 'post', getDemoList);
