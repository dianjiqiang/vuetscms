import { AxiosRequestConfig, AxiosResponse } from '_axios@0.26.0@axios'

export interface KeyieRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

//这个是对我们以前的config中的类型AxiosRequestConfig 中不能传递函数的缺陷的一个修复 让我们继承一个新的可以传递函数的接口
export interface KeyieRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: KeyieRequestInterceptor<T> //在这里继承我们上面定义的可以传递hook的类型后 我们的config就可以传递属性了
  showLoading?: boolean
}
