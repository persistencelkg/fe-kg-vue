import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {Layout} from "ant-design-vue";
import {loadView} from "../../const/const.ts";


// 扩展vue-router
declare module 'vue-router' {
    interface RouteMeta {
        hidden?: boolean
    }
}


 const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/redirect',
        component: Layout,
        
        children: [
            {
                path: '/redirect/:path*',
                component: loadView('redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: loadView('/')
        
    },
    {
        path: '/auth-redirect',
        component: loadView('/login/auth-redirect')
        
    },
    {
        path: '/404',
        component: loadView('error-page/404')

    },
    {
        path: '/401',
        component: loadView('error-page/401')
        
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: loadView('dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    }
]



// 创建vue路由实例
export const router = createRouter({
    // 使用 history 模式
    history: createWebHistory(),
    // scrollBehavior: () => ({ top: 0 }), // 页面滚动行为
    routes: constantRoutes
})