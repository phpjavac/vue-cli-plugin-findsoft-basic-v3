import {
  createRouter, createWebHistory, RouteRecordRaw,
} from 'vue-router';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
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
];

const router = createRouter({
  history: createWebHistory('/dcaw'),
  routes,
});

export default router;
