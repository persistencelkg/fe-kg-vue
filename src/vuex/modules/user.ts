import {defineStore} from 'pinia'
import {loginCheck, loginOut} from "../../third/sso/sso.ts";
import {addDynamicRoute} from "./vue-router.ts";
import {SSO_LOGIN_URL} from "../../const/const.ts";
import {grantStore} from "./grant.ts";
import {RouteRecordRaw} from "vue-router";



export const userStore = defineStore('usr', {
    state: () => ({
        userId: 0,
        userName: '',
        avatar: '',
        orgId: '',
        roles: [] as string[],
        grants: [] as string[]
    }),
    // 通用用于网络交互rpc，无返回值的业务逻辑，修改state，写操作为主
    actions: {
        ssoLoginCheck: async function (params: any) {
            try {
                const res = await loginCheck(params)
                this.userId = res.userId
                this.userName = res.userName
                this.avatar = res.avatar
                const grant = grantStore()
                // generate accessible routes map based on roles
                const accessRoutes:RouteRecordRaw[] = await grant.generateRoutesFromAuth()
                accessRoutes.forEach((route) => {
                   addDynamicRoute(route)
                })
                // dynamically add accessible routes
                return {accessToken: res.accessToken}
            } catch (e) {
                throw e
            }
        },
        async ssoLoginOut(params: any) {
            loginOut(params).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.error('loginOut', err)
            }).finally(() => {
                window.location.replace(SSO_LOGIN_URL)
            })
        }
    },
    // 用户计算属性，响应式交互，有返回值，读写操作都有
    getters: {},
})