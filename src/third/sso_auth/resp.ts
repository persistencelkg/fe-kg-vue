export interface LoginResponse {
    accessToken: string,
    userId: number,
    userName: string
    avatar: string | ''
}


export interface LoginOutResp{
    status: number
}


export interface MenuTree{
    parentId: number,
    key: string,
    // route uri
    uri: string,
    children: MenuTree[],
    name: string,
    icon: string,
    // 菜单类型
    type: number
}

export interface AuthListResp {
    userId: number,
    menuTree: MenuTree[]
}