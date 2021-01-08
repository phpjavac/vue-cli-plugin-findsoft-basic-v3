import Mock from 'mockjs';
import MockRequest, { AjaxDate } from './MockRequest';

// 示例
export function getDemoList(data: AjaxDate) {
  const { pageNo, pageSize } = JSON.parse(data.body);
  console.log('请求参数', pageNo, pageSize);
  return new MockRequest(Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    }],
  }), '模拟的接口信息返回', true);
}

export function test() { return {}; }
