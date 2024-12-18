import {defineStore} from 'pinia'
import {loginCheck, loginOut} from "../../third/sso/sso.ts";

export const userStore = defineStore('usr', {
    state: () => ({
        userId: '',
        userName: '',
        avatar: '',
        orgId: '',
        roles: [] as string[],
        grants: [] as string[]
    }),
    // 通用用于网络交互rpc，无返回值的业务逻辑，修改state，写操作为主
    actions: {
        async ssoLoginCheck() {
            try {
                const res = await loginCheck()
                state.userId = res.userId
                state.userName = req.userName
                state.avatar = req.avatar | '' | undefined
                // generate accessible routes map based on roles
                const accessRoutes = await this.$dispatch('permission/generateRoutesSSO', null, { root: true })
                // dynamically add accessible routes
                router.addRoutes(accessRoutes)
                return { accessToken: res.access_token }
            } catch (e) {
                throw e
            }
        },
        async ssoLoginOut(){
            const res = await loginOut()
        }
    },
    // 用户计算属性，响应式交互，有返回值，读写操作都有
    getters: {},
})