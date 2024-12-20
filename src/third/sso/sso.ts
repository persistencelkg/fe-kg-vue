import req from '../../utils/request.ts'
import {LoginResponse, LoginOutResp, AuthListResp} from "./resp.ts";

// sso登录base 能力
const {post: ssoPost} = req(import.meta.env.VUE_APP_BASE_SSO_URL)
// 权限检查
const {post: permissionPost} = req(import.meta.env.VUE_APP_BASE_AUTH_URL)

export const loginCheck = (params: Record<string, any>) => {
    return ssoPost<LoginResponse>("/login-check", params);
}
export const loginOut = (params: Record<string, any>) => ssoPost<LoginOutResp>("/login-out", params, {noParamsKey: true})
export const fetchPermission = (params: Record<string, any>) => permissionPost<AuthListResp>("/permission-fetch", params, {noParamsKey: true})

