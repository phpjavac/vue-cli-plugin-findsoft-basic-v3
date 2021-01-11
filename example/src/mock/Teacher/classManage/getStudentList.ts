import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';

function getStudentList(data: AjaxDate) {
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

function delteStudent() {
  return Mock.mock(new MockRequest({}, null, true));
}

function changeStudentName() {
  return Mock.mock(new MockRequest({}, null, true));
}

export { getStudentList, delteStudent, changeStudentName };
