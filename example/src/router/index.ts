import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  // {
  //   path: '/case',
  //   name: 'case',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/case.vue'),
  //   children: [
  //     {

  //       path: '/index',
  //       name: 'case-index',
  //       component: () => import('../views/case_index.vue'),

  //     },
  //   ],
  // },
  {
    path: '/Teacher',
    name: 'teacher',
    component: () => import(/* webpackChunkName: "teacher" */ '../views/Teacher/index.vue'),
    children: [
      // {
      //   path: '/Teacher/userlist',
      //   name: 'teacher/userlist',
      //   // meta: meta(2, true),
      //   component: () => import(/* webpackChunkName: "teacher/userlist" */ '../views/Teacher/userManage/userList.vue'),
      // },
      {
        path: '/Teacher/classlist',
        name: 'teacher/classlist',
        // meta: meta(1, true),
        component: () => import(/* webpackChunkName: "teacher/classlist" */ '../views/Teacher/classManage/classList.vue'),
      },
      // {
      //   path: '/Teacher/userInfo',
      //   name: 'TeacherUserInfo',
      //   // meta: meta(0, true),
      //   component: () => import(/* webpackChunkName: "teacher/userInfo" */ '../views/Public/UserInfo.vue'),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
