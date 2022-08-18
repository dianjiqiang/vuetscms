import { Module } from 'vuex'

import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '../../../service/main/analysis/dashboard'

import type { IDashboardState } from './types'
import type { IRootState } from '../../types'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, payload: any) {
      state.categoryGoodsCount = payload.data
    },
    changeCategoryGoodsSale(state, payload: any) {
      state.categoryGoodsSale = payload.data
    },
    changeCategoryGoodsFavor(state, payload: any) {
      state.categoryGoodsFavor = payload.data
    },
    changeAddressGoodsSale(state, payload: any) {
      state.addressGoodsSale = payload.data
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult)

      const addressSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressSaleResult)
    }
  }
}

export default dashboardModule
