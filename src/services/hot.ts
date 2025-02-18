import {http} from "@/utils/http"
import type {PageParams} from "@/types/global.d.ts"
import type {HotResult} from "@/types/hot"

// 通用热门推荐类型
type HotParams = PageParams & {subType?:string}
export const getHotRecommendAPI=(url:string,data?:HotParams)=>{
  return http<HotResult>({
    method:'GET',
    url,
    data
  })
}
