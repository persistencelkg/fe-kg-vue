import {defineStore, StoreDefinition} from "pinia";
import {fetchPermission} from "../../third/sso/sso.ts";
import {loadView} from "../../const/const.ts";

function getFirstPathFromChildren(childrenRoutes) {
    const route = childrenRoutes[0]
    const children = route.children
    const firstRoute = route
    if (children.length) {
        return getFirstPathFromChildre(children)
    }
    return firstRoute
}


const generaMenu = (routes: string[]) => {
    const arr = []
    routes.forEach(item => {
        const {url, children, name, icon} = item
        const hasChild = children && children.length
        const viewPath = hasChild ? getFirstPathFromChildren(children).url : url
        const menu = {
            path: url,
            component: hasChild ? (item.parent_id === 0 ? Layout : AppMain) : loadView(viewPath),
            children: [],
            name,
            meta: {
                title: name,
                icon: icon,
                noCache: true
            }
        }
        if (hasChild) {
            menu.redirect = getFirstPathFromChildre(children).url
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
    getters: {

    },
    actions: {
        generateRoutesFromAuth() {
            fetchPermission({sys_key: 'admin'})
                .then(resp => {
                    const loadMenuData = resp.menu_trees || [] || undefined
                    const addRoutes = generaMenu(loadMenuData)
                    addRoutes.push({path: '*', redirect: '/', hidden: true})
                    state.routes = [].concat(addRoutes)
                })
                .catch(err => {
                    console.log('generateRoutesFromAuth 错误:', err)
                })

        }
    }
})