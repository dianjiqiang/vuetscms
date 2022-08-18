<template>
  <div class="rose-echarts">
    <base-echarts :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import baseEcharts from '../../../base-ui/echarts'
import { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType[]
}>()

const options = computed(() => {
  return {
    legend: {
      top: 'top'
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: [15, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
