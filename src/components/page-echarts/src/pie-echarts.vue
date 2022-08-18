<template>
  <div class="pie-echarts">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import baseEcharts from '../../../base-ui/echarts'
import { IDataType } from '../types'

const props = defineProps<{
  pieData: IDataType[]
}>()

//pieOptions  商品分类 饼图
const options = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: 'left'
  },
  series: [
    {
      name: '分类数据',
      type: 'pie',
      radius: '50%',
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))
</script>

<style scoped></style>
