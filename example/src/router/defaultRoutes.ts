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
      path: '/Teacher/distributecase',
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
      path: '/Teacher/distributecase',
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
  ],
  student: [],
};

const getDefaultRoutes = (role: UserRole | null) => {
  if (role === null) return [];
  return routes[role] === undefined ? [] : routes[role];
};

export default getDefaultRoutes;
