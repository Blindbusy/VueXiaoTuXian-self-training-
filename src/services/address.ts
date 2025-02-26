import {http} from "@/utils/http"
import type {AddressParams} from "@/types/address.d.ts"

// 添加收获地址
export const postMemberAddressAPI = (data:AddressParams)=>{
  return http({
    method:'POST',
    url:'/member/address',
    data
  })
}
