<template>
  <div class="category">
    <page-search :form-config="formConfig" @queryBtnClick="handleQueryClick" @resetBtnClick="handleResetClick" />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="category"
      @editBtnClick="editBtnClick"
      @newBtnClick="newBtnClick"
    />
    <page-model ref="pageModelRef" :defaultInfo="defaultInfo" :model-config="modelConfig" page-name="department" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '../../../../components/page-search'
import pageContent from '../../../../components/page-content'
import pageModel from '../../../../components/page-model'

import { formConfig } from './config/search.config'
import { modelConfig } from './config/model.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '../../../../hooks/usePageSearch'
import { usePageModel } from '../../../../hooks/usePageModel'

export default defineComponent({
  name: 'category',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    const { pageModelRef, defaultInfo, editBtnClick, newBtnClick } = usePageModel(undefined, undefined)

    return {
      formConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      contentTableConfig,
      modelConfig,
      pageModelRef,
      defaultInfo,
      editBtnClick,
      newBtnClick
    }
  }
})
</script>

<style scoped></style>
