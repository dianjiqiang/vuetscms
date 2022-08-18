import keyieRequest from '../../index'
import { IDataType } from '../../login/types'

export function getPageListData(url: string, queryInfo: any) {
  return keyieRequest.post({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return keyieRequest.delete<IDataType>({
    url: url
  })
}
export function createPageDate(url: string, newData: any) {
  return keyieRequest.post({
    url: url,
    data: newData
  })
}
export function editPageDate(url: string, editData: any) {
  return keyieRequest.patch({
    url: url,
    data: editData
  })
}
