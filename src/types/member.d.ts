// 小程序登陆 登陆用户信息
export type LoginResult = {
  account:string,
  avatar:string,
  id:number,
  mobile:string,
  nickname:string,
  token:string
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
  /** 性别 */
  gender?: Gender
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
/** 性别 */
export type Gender = '女' | '男'

// 个人信息修-改请求题参数
export type ProfileParams=Pick<ProfileDetail,'nickname'|'gender'|'birthday'|'profession'> & {
  // 省份编码
  provinceCode?:string,
  // 城市编码
  cityCode?:string,
  // 区县编码
  countyCode?:string
}
