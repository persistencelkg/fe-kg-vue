
// 这是统一接入的登录页url
export const SSO_LOGIN_URL = `${import.meta.env.VITE_APP_BASE_SSO_URL}/#/login?ref=${window.location.origin}`


export const SYSTEM_INFO = {
    appName: 'Fe-Kg-Vue',
    avatar: ''
}

// 全局load view vite 不支持@，需要手动配置@解析规则, 并且要求指定文件后缀
// export basic loadView = (view: string) => import( /* @vite-ignore */`../../views/${view}.vue`)

export function loadView(view: string) {
    // 在vite 中直接使用${view}似乎会直接进入到网络请求
    const path = '../views/'.concat(view).concat('.vue')
    console.log(path)
    return () => import(/* @vite-ignore */path)
}
