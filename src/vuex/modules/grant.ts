import {defineStore, StoreDefinition} from "pinia";
import {fetchPermission} from "../../third/sso_auth/sso.ts";
import {loadView} from "../../const/const.ts";
import {MenuTree} from "../../third/sso_auth/resp.ts";
import {Layout} from "ant-design-vue";
import {addDynamicRoute} from "./vue-router.ts";
import {RouteRecordRaw} from "vue-router";


// 路由实例


// 生成树
const getFirstPathFromChildren = (childrenRoutes: MenuTree[]) => {
    const route = childrenRoutes[0]
    const children = route.children
    const firstRoute = route
    if (children.length) {
        return getFirstPathFromChildren(children)
    }
    return firstRoute
}


// TODO 后续如果后端支持了动态菜单，需要灵活调整改方法
const generaMenu = (routes: MenuTree[]) => {
    const arr: RouteRecordRaw[] = []
    routes?.forEach(item => {
        const {uri, children, name, icon} = item
        const hasChild = children && children.length
        const viewPath = hasChild ? getFirstPathFromChildren(children).uri : uri
        const menu:RouteRecordRaw = {
            path: uri,
            component: hasChild ? (item.parentId === 0 ? Layout : Layout) : loadView(viewPath),
            children: [],
            name,
            meta: {
                title: name,
                icon: icon,
                noCache: true
            },
            redirect: ''
        }
        if (hasChild) {
            menu.redirect = getFirstPathFromChildren(children).uri
            menu.children = generaMenu(item.children)
        }
        arr.push(menu)
    })
    return arr
}

export const grantStore: StoreDefinition = defineStore('grant', {
    state: () => (
        {
            routes: [] as RouteRecordRaw[],
        }
    ),
    getters: {},
    actions: {
        generateRoutesFromAuth() {
            fetchPermission({sys_key: 'admin'})
                .then(resp => {
                    const loadMenuData = resp?.menuTree || [] || undefined
                    const addRoutes = generaMenu(loadMenuData)
                    const cont = addDynamicRoute()
                    if (addRoutes) {
                        cont.concat(addRoutes)
                    }
                    this.routes = cont
                })
                .catch(err => {
                    console.log('generateRoutesFromAuth 错误:', err)
                })

        }
    }
})