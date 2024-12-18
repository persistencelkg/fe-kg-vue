import req from '../../utils/request.ts'
import {post} from "axios";

// sso登录base 能力
const {post: ssoPost} = req(import.meta.env.VUE_APP_BASE_SSO_URL)
// 权限检查
const {post: permissionPost} = req(import.meta.env.VUE_APP_BASE_AUTH_URL)

export const loginCheck = (params) => ssoPost("/login-check", params)
export const loginOut = (params) => ssoPost("/login-out", params, {noParamsKey: true})
export const fetchPermission = (params) => permissionPost("/permission-fetch", params, {noParamsKey: true})

