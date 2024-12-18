export const SSO_BASE_URL = `${import.meta.env.VUE_APP_BASE_SSO_URL}/#/login?ref=${window.location.origin}`

// 全局load view
export const loadView =  (view: string) => import(`@/views${view}`)