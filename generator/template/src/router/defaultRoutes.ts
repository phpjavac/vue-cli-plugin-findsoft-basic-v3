import { UserRole } from '@/types/user';

const routes = {
  admin: [
    {
      name: '用户管理',
      path: '/Teacher/userlist',
    },
    {
      name: '班级管理',
      path: '/Teacher/classlist',
    },
    {
      name: '实验管理',
      path: '/Teacher/experimentlist',
    },
    {
      name: '报告管理',
      path: '/Teacher/reportmanage',
    },
    {
      name: '资料中心',
      path: '/Teacher/datacenter',
    },
    {
      name: '自定义',
      path: '/Teacher/customcase',
    },
    // {
    //   name: '组件展示',
    //   path: '/Teacher/exhibition',
    // },
  ],
  teacher: [
    {
      name: '用户管理',
      path: '/Teacher/userlist',
    },
    {
      name: '班级管理',
      path: '/Teacher/classlist',
    },
    {
      name: '实验管理',
      path: '/Teacher/experimentlist',
    },
    {
      name: '报告管理',
      path: '/Teacher/reportmanage',
    },
    {
      name: '资料中心',
      path: '/Teacher/datacenter',
    },
    {
      name: '自定义',
      path: '/Teacher/customcase',
    },
    // {
    //   name: '组件展示',
    //   path: '/Teacher/exhibition',
    // },
  ],
  student: [
    {
      name: '组件展示',
      path: '/Teacher/exhibition',
    },
  ],
};

const getDefaultRoutes = (role: UserRole | null) => {
  if (role === null) return [];
  return routes[role] === undefined ? [] : routes[role];
};

export default getDefaultRoutes;
