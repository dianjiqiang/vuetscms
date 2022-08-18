import * as echarts from 'echarts'

import ChinaMapData from '../../../components/page-echarts/data/china.json'

// @ts-ignore
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }
  const updateResize = () => {
    echartsInstance.resize()
  }
  window.addEventListener('resize', () => {
    // 自动调整图形大小
    echartsInstance.resize()
  })
  return {
    echartsInstance,
    setOptions,
    updateResize
  }
}
