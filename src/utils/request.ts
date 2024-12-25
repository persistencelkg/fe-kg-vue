import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
// import { ElMessage, ElMessageBox } from 'element-plus'
import {message} from 'ant-design-vue'
import {SSO_LOGIN_URL} from "../const/const.ts";
//@ts-ignored
import humps from 'humps';


const httpCode: Record<number, string> = {
    400: '请求参数错误',
    401: '权限不足, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时'
}

// ts 中不支持自定义类型，需要扩展
declare module 'axios' {
    export interface AxiosRequestConfig {
        noParamsKey?: boolean,
        // 是否开启驼峰转下划线，默认驼峰
        underlineKey?: boolean
    }
}

const getAxiosService = (uri: string) => {
    const service: AxiosInstance = axios.create(
        {
            baseURL: uri,
            // withCredentials: true, // 允许跨域携带cookie
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    // 请求拦截器
    service.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // extend anything
            config.headers['Content-Type'] = 'application/json'
            return config
        },
        (err) => {
            console.error('request.ts 异常：', err)
            return Promise.reject(err)
        }
    )
    // 响应拦截器
    service.interceptors.response.use(
        (resp: AxiosResponse) => {
            // axios框架自带结构 加别名做区分
            const {data: result} = resp
            console.log('resp full resp:', result)
            // 后端定义返回结构解析
            const {code, message: errMsg, data} = result
            switch (code) {
                case 0:
                case 200:
                    return data
                case 1001:
                    message
                        .loading(
                            '会话失效，请重新登录',
                            2.5,
                            () => window.location.replace(SSO_LOGIN_URL))
                        .then(
                            () => {
                            },
                            () => message.error(errMsg, 2.5)
                        )
                    return Promise.reject(message)
                case 1002:
                    return Promise.reject(message)
                default:
                    return Promise.reject(message)
            }
        },
        (err) => {
            if (err.message === 'Network Error') {
                console.error('网络连接异常')
            } else if (err.response) {
                const status = err.response.status
                const tip = httpCode[status] || err.response.data.message || '未知请求错误'
                message.loading(tip, 2.5).then(() => message.error(tip))
            } else {
                console.error('未知异常', err)
            }
            return Promise.reject(err)
        }
    )


    // 封装 get 请求
    const get = <T>(url: string, params?: object, config: AxiosRequestConfig = {}) => {
        return new Promise<T>((resolve, reject) => {
            service({
                method: 'get',
                url,
                params,
                ...config
            })
                .then((response) => resolve(response as unknown as T))
                .catch((error) => reject(error))
        })
    }

    // 封装 post 请求
    const post = <T>(url: string, data: object = {}, config: AxiosRequestConfig = {}) => {

        return new Promise<T>((resolve, reject) => {
            const paramWrapData = config.noParamsKey ? data : {params: data}
            const camelWrapData = config.underlineKey ? humps.decamelizeKeys(paramWrapData) : paramWrapData
            const options = {
                method: 'post',
                url,
                data: camelWrapData,
                ...config
            }
            console.log('req:', uri, options.url)
            service(options)
                .then((response) => {
                    console.log('pre parse resp:', response)
                    if (response && config.underlineKey) {
                        const wrapResp = humps.decamelizeKeys(response)
                        resolve(wrapResp as unknown as T)
                    } else {
                        const wrapResp = humps.camelizeKeys(response)
                        resolve(wrapResp as unknown as T)
                    }
                })
                .catch((error) => reject(error))
        })
    }


    return {
        get,
        post
    }
}


export default getAxiosService
