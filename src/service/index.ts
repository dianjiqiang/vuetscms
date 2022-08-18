// service 统一出口
import KeyieRequest from './require/request'
import { BASE_URL, TIME_OUT } from './require/config'

import localCache from '../utils/cache'

const keyieRequest = new KeyieRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token') ?? ''
      if (token) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default keyieRequest
