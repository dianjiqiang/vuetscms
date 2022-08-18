import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { KeyieRequestConfig, KeyieRequestInterceptor } from './type'

import { ElLoading } from 'element-plus'

class KeyieRequest {
  instance: AxiosInstance
  interceptors?: KeyieRequestInterceptor
  isLoading?: any
  showLoading?: boolean

  constructor(config: KeyieRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true //默认情况下是显示的

    //下面的拦截器是我们实例才有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //当我们这里的this.showLoading是有值的时候 我们才会显示这个loading
        if (this.showLoading) {
          this.isLoading = ElLoading.service({
            lock: true, // 是否需要使用蒙版
            text: 'loading···', //在加载图标下方显示的文字
            background: 'rgba(0,0,0,0.3)' // 设置遮罩背景色
          })
        }
        return config
      },
      (err) => {
        this.showLoading = true
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //模拟数据请求失败 不报错的处理情况
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          this.isLoading?.close()
          return data
        }
      },
      (err) => {
        //根据不同的httpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误')
        }
        this.showLoading = true
        return err
      }
    )
  }

  request<T = any>(config: KeyieRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断是否需要显示showLoading
      if (config.showLoading === false) this.showLoading = config.showLoading

      //判断用户调用我们的request方法的时候 是否给我们传递了拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          //我们在上边设置完 this.showLoading的值z为false之后会影响下一次的请求 为了避免，在之后设置true
          this.showLoading = true

          //将结果resolve 返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: KeyieRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: KeyieRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: KeyieRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: KeyieRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default KeyieRequest
