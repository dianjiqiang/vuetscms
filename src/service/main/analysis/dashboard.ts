import keyieRequest from '../../index'

enum DashboardApi {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return keyieRequest.get({
    url: DashboardApi.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return keyieRequest.get({
    url: DashboardApi.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return keyieRequest.get({
    url: DashboardApi.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return keyieRequest.get({
    url: DashboardApi.addressGoodsSale
  })
}
