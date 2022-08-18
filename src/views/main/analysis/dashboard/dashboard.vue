<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <keyie-card title="分类商品数量(饼图)">
          <pieEcharts :pie-data="categoryGoodsCount" />
        </keyie-card>
      </el-col>
      <el-col :span="10">
        <keyie-card title="不同城市商品销量">
          <map-echarts :map-data="addressGoodsSale" />
        </keyie-card>
      </el-col>
      <el-col :span="7">
        <keyie-card title="分类商品数量(玫瑰图)">
          <rose-echarts :rose-data="categoryGoodsCount" />
        </keyie-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="padding-top: 20px">
      <el-col :span="12">
        <keyie-card title="分类商品的销量">
          <line-echarts :values="cateGoryGoodsSale.values" :x-labels="cateGoryGoodsSale.xLabels" />
        </keyie-card>
      </el-col>
      <el-col :span="12">
        <keyie-card title="分类商品的收藏">
          <bar-echarts
            :values="cateGoryGoodsFavor.values"
            :x-labels="cateGoryGoodsFavor.xLabels"
            title="商品收藏柱状图(滚动缩放)"
          />
        </keyie-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../../../store'

import keyieCard from '../../../../base-ui/card'
import { pieEcharts, roseEcharts, lineEcharts, barEcharts, mapEcharts } from '../../../../components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    keyieCard,
    pieEcharts,
    roseEcharts,
    lineEcharts,
    barEcharts,
    mapEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 第一个饼图 和 第三个玫瑰图
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    // 第二个地图
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return {
          name: item.address,
          value: item.count
        }
      })
    })

    // 第四个折线图
    const cateGoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const cateGoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of cateGoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLabels, values }
    })

    // 第五个伸缩柱状图
    const cateGoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return { xLabels, values }
    })
    return {
      categoryGoodsCount,
      cateGoryGoodsSale,
      cateGoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped></style>
