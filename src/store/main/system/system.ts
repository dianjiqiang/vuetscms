import { Module } from 'vuex'
import { ISystemState, IPageInfo } from './types'
import { IRootState } from '../../types'

import { getPageListData, deletePageData, createPageDate, editPageDate } from '../../../service/main/system/system'

const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      pageInfo: {
        offset: 0,
        size: 10
      },
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0,
      storyList: [],
      storyCount: 0
    }
  },
  mutations: {
    setPageInfo(state, pageInfo: IPageInfo) {
      state.pageInfo = pageInfo
    },
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    changeDepartmentList(state, department: any[]) {
      state.departmentList = department
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    },
    changeCategoryList(state, department: any[]) {
      state.categoryList = department
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count
    },
    changeStoryList(state, department: any[]) {
      state.storyList = department
    },
    changeStoryCount(state, count: number) {
      state.storyCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //?????? pageUrl
      const pageName = payload.pageName
      let pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      // ???????????????????????????payload ???????????????????????????
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data
      commit(`change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}List`, list)
      commit(`change${pageName.slice(0, 1).toUpperCase() + pageName.slice(1)}Count`, totalCount)
    },
    async deletePageDateAction({ dispatch, state }, payload: any) {
      // 1.????????????pageName   2. ??????????????????????????????id
      const { pageName, id } = payload
      const { offset, size } = state.pageInfo
      const pageUrl = `/${pageName}/${id}`
      //???????????????????????????
      await deletePageData(pageUrl)
      //???????????????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: offset,
          size: size
        }
      })
    },
    //????????????
    async createPageDataAction({ dispatch }, payload: any) {
      //?????????????????????
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageDate(pageUrl, newData)
      //?????????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //????????????
    async editPageDataAction({ dispatch, state }, payload: any) {
      //?????????????????????
      const { pageName, editData, id } = payload
      const { offset, size } = state.pageInfo
      const pageUrl = `/${pageName}/${id}`
      await editPageDate(pageUrl, editData)
      //?????????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: offset,
          size: size
        }
      })
    }
  }
}

export default system
