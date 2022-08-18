import { Module } from 'vuex'

import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '../../service/login/login'
import type { IAccount } from '../../service/login/types'

import type { IRootState } from '../types'
import type { ILoginState } from './types'

import { mapMenusToRoutes, mapMenusToPermissions } from '../../utils/map-menus'
import localCache from '../../utils/cache'
import router from '../../router' // 这是我们的总路由表

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: {},
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 1. 将我们的userMenus 传递到我们的 routes中
      const routes = mapMenusToRoutes(userMenus)
      // 2. 将我们的routes 动态添加到我们的路由表中
      routes.forEach((route) => {
        router.addRoute('Main', route)
      })

      // 获取用户按钮的权限
      state.permissions = mapMenusToPermissions(userMenus)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      //请求用户信息
      const userInfoResult: any = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //请求用户的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //跳转到我们的首页
      await router.push('/main')
    },
    phoneLoginAction(_, payload: any) {
      console.log('执行了手机登录操作', payload)
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule
