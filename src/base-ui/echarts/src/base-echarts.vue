<template>
  <div class="base-echarts">
    <div ref="echartsDivRef" :style="echartsStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'

import useEcharts from '../hooks/useEcharts'

export default defineComponent({
  name: 'base-echarts',
  props: {
    echartsStyle: {
      type: Object,
      default() {
        return {
          width: '100%',
          height: '360px'
        }
      }
    },
    options: {
      type: Object,
      default() {
        return {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        }
      }
    }
  },
  setup(props) {
    const echartsDivRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOptions } = useEcharts(echartsDivRef.value as HTMLElement)
      watchEffect(() => {
        // @ts-ignore
        setOptions(props.options)
      })
    })
    return {
      echartsDivRef
    }
  }
})
</script>

<style scoped></style>
