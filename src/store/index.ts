import { createStore, Store, useStore as useVuexStore } from 'vuex'

import type { IRootState, IStoreType } from './types'

import loginModule from './login/login'
import system from './main/system/system'
import dashboardModule from './main/analysis/dashboard'

import { getPageListData } from '../service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'keyie',
      age: 12,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList: any) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList: any) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList: any) {
      state.entireMenu = menuList
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求我们的部门和角色数据
      const { data: departmentData } = await getPageListData('/department/list', {
        offset: 0,
        size: 10
      })
      const departmentList = departmentData.list
      const { data: roleData } = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const roleList = roleData.list
      const { data: menuData } = await getPageListData('/menu/list', {})
      const menuList = menuData.list
      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: {
    login: loginModule,
    system,
    dashboard: dashboardModule
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin').then()
  // @ts-ignore   检测我们账号是否登录
  if (store.state.login.token.length > 0) {
    store.dispatch('getInitialDataAction').then()
  }
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
