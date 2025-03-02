import { http } from '@/utils/http'
// 加入购物车接口
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  const res = http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
