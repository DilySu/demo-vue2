import Vue from "vue";
import Router from 'vue-router'
// import Home from "@/components/Home.vue";

Vue.use(Router)

const router  =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true,
        },
        {
            path: '/login',
            name:'Login',
            hidden: true,
            component: () => import("@/view/login/LoginTwo.vue")
        },
        // {
            // path: '/home',
            // component: () => import("@/components/Home.vue")
            // component: resolve => require(['@/components/Home.vue'],resolve)
            // component: Home
        // },
        {
            path: '/home',
            name: '学生管理',
            redirect: '/home/student',
            iconClass: 'fa fa-bar-chart',
            component: () => import('@/components/layout/Home.vue'),
            children:[
                {
                    path:'/home/student',
                    name: '学生列表',
                    iconClass: 'fa fa-list',
                    component: () => import('@/view/students/StudentList.vue')
                },
                {
                    path:'/home/info',
                    name: '信息列表',
                    iconClass: 'fa fa-list-alt',
                    component: () => import('@/view/students/InfoList.vue')
                },
                {
                    path:'/home/infoManage',
                    name: '信息管理',
                    iconClass: 'fa fa-list-alt',
                    component: () => import('@/view/students/InfoManage.vue')
                },
                {
                    path:'/home/work',
                    name: '作业列表',
                    iconClass: 'fa fa-list-ul',
                    component: () => import('@/view/students/WorkList.vue')
                },
                {
                    path:'/home/workMange',
                    name: '作业管理',
                    iconClass: 'fa fa-th-list',
                    component: () => import('@/view/students/WorkManage.vue')
                },
            ]
        },
        {
            path: '/data',
            name: '数据分析',
            iconClass: 'fa fa-line-chart',
            component: () => import('@/components/layout/Home.vue'),
            children:[
                {
                    path:'/data/dataView',
                    name: '数据概览',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/view/dataAnalysis/DataView.vue')
                },
                {
                    path:'/data/mapView',
                    name: '地图概览',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/view/dataAnalysis/MapView.vue')
                },
                {
                    path:'/data/TravelMap',
                    name: '旅游地图',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/view/dataAnalysis/TravelMap.vue')
                },
                {
                    path:'/data/ScoreMap',
                    name: '分数地图',
                    iconClass: 'fa fa-line-chart',
                    component: () => import('@/view/dataAnalysis/ScoreMap.vue')
                }
            ]
        },
        {
            path: '/users',
            name: '用户中心',
            iconClass: 'fa fa-users',
            component: () => import('@/components/layout/Home.vue'),
            children:[
                {
                    path:'/users/users',
                    name: '用户管理',
                    iconClass: 'fa fa-users',
                    component: () => import('@/view/users/User.vue')
                }
            ]
        },
        {
            path: '/404',
            name:'404',
            hidden: true,
            component: () => import("@/components/error/404.vue")
        },
        {
            path: '/401',
            name:'401',
            hidden: true,
            component: () => import("@/components/error/401.vue")
        },
    ],
    mode: 'history'
})
export default router