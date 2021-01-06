import {
  createRouter, createWebHashHistory, RouteRecordRaw,
} from 'vue-router';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/Teacher',
    name: 'case',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Teacher" */ '../views/Teacher/index.vue'),
    children: [
      {

        path: '/Teacher/userlist',
        name: 'Teacher/userlist',
        component: () => import(/* webpackChunkName: "userlist_index" */ '../views/Teacher/userlist/index.vue'),

      },
      {

        path: '/Teacher/classlist',
        name: 'Teacher/classlist',
        // role: ['admin'], // 计划用这样的权限组去区分，判断的地方用includes
        component: () => import(/* webpackChunkName: "userlist_index" */ '../views/Teacher/classManage/index.vue'),

      },
      {

        path: '/Teacher/userInfo',
        name: 'Teacher/UserInfo',
        component: () => import(/* webpackChunkName: "teacher/userinfo" */ '../views/Teacher/Public/UserInfo.vue'),

      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/dcaw'),
  routes,
});

export default router;
