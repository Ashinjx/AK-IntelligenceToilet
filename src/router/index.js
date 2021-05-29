import Vue from 'vue';
import VueRouter from 'vue-router';

//登录
import Login from '../views/login/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  //首页
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index/Index.vue'),
  },
  //智慧厕所
  {
    path: '/intelligenceToilet',
    name: 'IntelligenceToilet',
    component: () => import(/* webpackChunkName: "intelligenceToilet" */ '../views/IntelligenceToilet/IntelligenceToilet.vue'),
    children: [
      {
        path: 'lavatoryManagement',
        name: 'LavatoryManagement',
        component: () => import(/* webpackChunkName: "intelligenceToilet" */ '../views/IntelligenceToilet/LavatoryManagement.vue'),
      },
      {
        path: 'deviceManagement',
        name: 'DeviceManagement',
        component: () => import(/* webpackChunkName: "intelligenceToilet" */ '../views/IntelligenceToilet/DeviceManagement.vue'),
      },
    ],
  },
  //告警管理
  {
    path: '/warningMenage',
    name: 'WarningMenage',
    component: () => import(/* webpackChunkName: "WarningMenage" */ '../views/WarningMenage/WarningMenage.vue'),
    children: [
      {
        path: 'alarmList',
        name: 'AlarmList',
        component: () => import(/* webpackChunkName: "WarningMenage" */ '../views/WarningMenage/AlarmList.vue'),
      },
      {
        path: 'alarmTemplate',
        name: 'AlarmTemplate',
        component: () => import(/* webpackChunkName: "WarningMenage" */ '../views/WarningMenage/AlarmTemplate.vue'),
      },
      {
        path: 'monitorItem',
        name: 'MonitorItem',
        component: () => import(/* webpackChunkName: "WarningMenage" */ '../views/WarningMenage/MonitorItem.vue'),
      },
      {
        path: 'monitorType',
        name: 'MonitorType',
        component: () => import(/* webpackChunkName: "WarningMenage" */ '../views/WarningMenage/MonitorType.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
