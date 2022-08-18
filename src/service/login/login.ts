import keyieRequest from '../index'
import type { IAccount, IDataType, ILoginResult } from './types'

enum loginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return keyieRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return keyieRequest.get<IDataType>({
    url: loginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return keyieRequest.get<IDataType>({
    url: loginAPI.UserMenus + id + '/menu'
  })
}
