import req from '../../utils/request.ts'


const { post: grayPost } = req(import.meta.env.VITE_GRAY_ADMIN_URL)

export const createGrayRule =(params: Record<string, any>) => grayPost("/gray-rule/create", params, {underlineKey: true} )

export const grayList =(params: Record<string, any>) => grayPost("/gray-rule/list", params, {underlineKey: true} )

export const modifyGray =(params: Record<string, any>) => grayPost("/gray-rule/modify", params, {underlineKey: true} )