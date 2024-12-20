import {defineStore, StoreDefinition} from "pinia";
import {fetchPermission} from "../../third/sso/sso.ts";
import {loadView} from "../../const/const.ts";
import {MenuTree} from "../../third/sso/resp.ts";
import {Layout} from "ant-design-vue";


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


const generaMenu = (routes: MenuTree[]) => {
    const arr: any = []
    routes.forEach(item => {
        const {url, children, name, icon} = item
        const hasChild = children && children.length
        const viewPath = hasChild ? getFirstPathFromChildren(children).url : url
        const menu = {
            path: url,
            component: hasChild ? (item.parent_id === 0 ? Layout : Layout) : loadView(viewPath),
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
            menu.redirect = getFirstPathFromChildren(children).url
            menu.children = generaMenu(item.children)
        }
        arr.push(menu)
    })
    return arr
}

export const grantStore: StoreDefinition = defineStore('grant', {
    state: () => (
        {
            routes: []
        }
    ),
    getters: {},
    actions: {
        generateRoutesFromAuth() {
            fetchPermission({sys_key: 'admin'})
                .then(resp => {
                    const loadMenuData = resp.menu_trees || [] || undefined
                    const addRoutes = generaMenu(loadMenuData)
                    this.routes = [{path: '*', redirect: '/', hidden: true}].concat(addRoutes)
                })
                .catch(err => {
                    console.log('generateRoutesFromAuth 错误:', err)
                })

        }
    }
})