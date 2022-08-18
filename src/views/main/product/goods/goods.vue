<template>
  <div class="goods">
    <pageSearch :form-config="formConfig" @queryBtnClick="handleQueryClick" @resetBtnClick="handleResetClick" />
    <page-content :content-table-config="contentTableConfig" page-name="goods">
      <template #image="scope">
        <el-image :preview-src-list="[scope.row.imgUrl]" :src="scope.row.imgUrl" style="width: 60px; height: 60px" />
      </template>
      <template #oldPrice="scope">{{ '￥' + parseInt(scope.row.oldPrice).toFixed(2) }}</template>
      <template #newPrice="scope">{{ '￥' + parseInt(scope.row.newPrice).toFixed(2) }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '../../../../components/page-content'
import pageSearch from '../../../../components/page-search'
import { ElImage } from 'element-plus'

import { contentTableConfig } from './config/content.config'
import { formConfig } from './config/search.config'

import { usePageSearch } from '../../../../hooks/usePageSearch'

export default defineComponent({
  name: 'goods',
  components: {
    pageContent,
    pageSearch,
    ElImage
  },
  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    return {
      contentTableConfig,
      formConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped></style>
