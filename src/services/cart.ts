import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'
// 加入购物车接口
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
// 从购物车获取商品列表
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}
