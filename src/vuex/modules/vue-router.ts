import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {loadView} from "../../const/const.ts";
import {userStore} from "./user.ts";
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
        component: loadView('home/login')

    },
    // {
    //     path: '/:catchAll(.*)',
    //     component: loadView('basic/NotFound')
    //
    // },
    {
        path: '/',
        name: 'index',
        component: loadView('home/index'),
        // redirect: '/home',
        children: [
            {
                path: '/a3',
                name: "F1",
                component: loadView('a2/F1'),
                meta: {title: '首页2', icon: 'dashboard', keepAlive: false}

            },
            {
                path: '/a2',
                name: "a2",
                component: loadView('a2/a2path/index'),
                // children: [{
                //     name: "a2path",
                //     path: 'a2path', // 如果为'' 代表可以渲染a2
                //     component: loadView('a2/a2path/index'),
                // }],

                meta: {title: '首页', icon: 'dashboard', keepAlive: false}
            },

        ]
    }
]

const dynamicRouter: RouteRecordRaw[] = []

export const addDynamicRoute = (route?: RouteRecordRaw) => {
    if (route) {
        dynamicRouter.push(route)
    }
    return dynamicRouter
}

// common
addDynamicRoute({path: '*', redirect: '/'});


// 创建vue路由实例
export const router = createRouter({
    // 使用 history 模式
    history: createWebHistory(),
    // scrollBehavior: () => ({ top: 0 }), // 页面滚动行为
    routes: constantRoutes
})


router.beforeEach(async (to, from, next) => {
    console.log('from:[', from.path, ']--> to:[', to.path, ']')
    // next()
    // ToDo 先判断本地缓存有没有


    const user = userStore();
    if (user.token) {
        next()
    } else {
        const res = await user.ssoLoginCheck({})
        if (res.accessToken && res.accessToken.length > 0) {
            next({path: '/'})
        } else {
            // 跳转到登录页 后续 需要提供html 登录页
            // window.location.replace(SSO_LOGIN_URL)
            next()
        }
    }


})