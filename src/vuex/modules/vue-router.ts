import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {Layout} from "ant-design-vue";
import {loadView} from "../../const/const.ts";
// import index from "../../views/home/index.vue";


// 扩展vue-router
declare module 'vue-router' {
    interface RouteMeta {
        hidden?: boolean
        title?: string
        icon?: string
        affix?: boolean
        keepAlive?: boolean
    }
}


const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: "login",
        component: loadView('/')

    },
    {
        path: '/a3',
        name: "F1",
        component: loadView('a2/F1'),
        meta: {title: '首页2', icon: 'dashboard', keepAlive: true}

    },
    {
        path: '/a2',
        redirect: '/a2path',
        component: null,
        children: {
            name: "a2path",
            path: 'a2path',
            component: loadView('a2/F1'),
        },

        meta: {title: '首页', icon: 'dashboard', keepAlive: true}
    },
    // {
    //     path: '/:catchAll(.*)',
    //     component: loadView('basic/NotFound')
    //
    // },
    {
        path: '/',
        component: null,
        redirect: '/home',
        children: [
            {
                path: 'home',
                // component: index 静态导入
                // 动态替换v1
                // component:  () => import('../../views/home/index.vue'),
                component: loadView('home/index'),
                name: 'index',
                meta: {title: '首页', icon: 'dashboard', affix: true, keepAlive: true}
            },

        ]
    }
]

const dynamicRouter: RouteRecordRaw[] = []

export const addDynamicRoute = (route: RouteRecordRaw) => {
    dynamicRouter.push(route)
}

// common
addDynamicRoute( { path: '*', redirect: '/', hidden: true });


// 创建vue路由实例
export const router = createRouter({
    // 使用 history 模式
    history: createWebHistory(),
    // scrollBehavior: () => ({ top: 0 }), // 页面滚动行为
    routes: constantRoutes
})


router.beforeEach((to, from, next) => {
    console.log('to:', to.path)
    console.log('from:', from.path)
    // next()
    next()
})