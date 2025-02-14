import { useMemberStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
  // 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options:UniApp.RequestOptions){
    // 非http开头需要拼接地址
    if(!options.url.startsWith('http')){
      options.url = baseURL + options.url
    }
    // 请求超时
    options.timeout = 10000
    // 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    // 添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if(token){
      options.header.Authorization = token
    }
    console.log(options)
  }
}
// 拦截request请求
uni.addInterceptor('request',httpInterceptor)
// 拦截uploadFile文件上传
uni.addInterceptor('uploadFile',httpInterceptor)

// 接口定义，用于限制类型
interface Data<T> {
  code: string
  msg: string
  result: T
}
// 添加类型，支持范型
export const http = <T>(options:UniApp.RequestOptions) => {
  // 返回Promise对象
  return new Promise <Data<T>>((resolve,reject)=>{
    uni.request({
      ...options,
      // 请求成功
      success(res){
        // 状态码2xx，axios的设计也是如此
        if(res.statusCode >= 200 && res.statusCode <300){
          // 获取数据成功，调用resolve
          resolve(res.data as Data<T>)
        }
        else if(res.statusCode === 401){
          // 401错误调用reject
          // 清理用户信息，跳转到登录页
          const memeberStore = useMemberStore()
          memeberStore.clearProfile()
          uni.navigateTo({
            url:'/pages/login/login'
          })
          reject(res)
        }
        else{
          // 通用错误，调用reject
          uni.showToast({
            icon:'none',
            title:(res.data as Data<T>).msg || "请求错误",
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err){
        // 网络错误，调用reject
        uni.showToast({
          icon:'none',
          title:'网络错误，换个网络试试'
        })
        reject(err)
      },
    })
  })
}
