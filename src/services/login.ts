import {http} from "@/utils/http"
import type {LoginResult} from "@/types/member"

type LoginParams={
  code:string,
  encrypteData:string,
  iv:string
}

// 小程序登陆
export const postLoginWxMinAPI=(data:LoginParams)=>{
  return http<LoginResult>({
    method:"POST",
    url:"/login/wxMin",
    data
  })
}

// 小程序登陆-内测版
/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
