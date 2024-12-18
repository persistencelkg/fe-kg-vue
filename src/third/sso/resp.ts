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
    parent_id: number,
    hash: string,
    url: string,
    children: MenuTree[],
    name: string,
    icon: string
}

export interface AuthListResp {
    userId: number,
    menu_trees: MenuTree[]
}