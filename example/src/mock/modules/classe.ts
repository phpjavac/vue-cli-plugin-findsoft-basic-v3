import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../MockRequest';

export function getClassList(data: AjaxDate) {
  const { pageNo = 1, pageSize = 15, totalRecords = 100 } = JSON.parse(data.body);
  return new MockRequest(
    Mock.mock({
      [`list|${pageSize}`]: [{
        id: '@guid',
        name: '@cname 的班级',
        stuNum: '@integer(0,100)',
        remarks: '@word()',
        userNames: '@cname',
        teacherCodes: '@name',
      }],
      pageNo,
      totalRecords,
    }), '请求成功', true,
  );
}

export function editClass(data: AjaxDate) {
  const { id } = JSON.parse(data.body);
  return new MockRequest(
    true, id ? '编辑成功' : '添加成功', true,
  );
}

export function delClass(data: AjaxDate) {
  const { ids } = JSON.parse(data.body);
  return new MockRequest(
    ids, '删除成功', true,
  );
}

export function insertStudent(data: AjaxDate) {
  const ids = JSON.parse(data.body);
  return new MockRequest(
    ids, '导入成功', true,
  );
}

export function test() { return {}; }
