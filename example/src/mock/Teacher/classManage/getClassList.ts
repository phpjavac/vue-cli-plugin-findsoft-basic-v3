import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';

function getClassList(data: AjaxDate) {
  const { pageNo, pageSize } = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest(
      {
        pageNo,
        pageSize,
        totalPages: 0,
        totalRecords: 10,
        'list|10': [
          {
            // 班级id
            id: '@id',
            // 班级名称
            name: '@ctitle(3,5)',
            // remarks
            remarks: '@ctitle(3,5)',
            // stuNum
            stuNum: 'number()',
            // 教师账号
            teacherCodes: '@id',
            // 教师名称
            userNames: '@ctitle(3,5)',
            // 是否禁用
            disable: true,
            // 是否为vipclass
            vipClass: true,
          },
        ],
      },
      null,
      true,
    ),
  );
}

function test() {
  return 'test';
}

export {
  getClassList, test,
};
