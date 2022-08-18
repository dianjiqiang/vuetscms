export interface IPageInfo {
  offset: number
  size: number
}

export interface ISystemState {
  pageInfo: IPageInfo
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
  departmentList: any[]
  departmentCount: number
  categoryList: any[]
  categoryCount: number
  storyList: any[]
  storyCount: number
}
