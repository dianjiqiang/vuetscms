<template>
  <div class="department">
    <page-search :form-config="formConfig" @queryBtnClick="handleQueryClick" @resetBtnClick="handleResetClick" />
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="department"
      @editBtnClick="editBtnClick"
      @newBtnClick="newBtnClick"
    />
    <page-model ref="pageModelRef" :defaultInfo="defaultInfo" :model-config="modelConfigRef" page-name="department" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import pageSearch from '../../../../components/page-search'
import pageContent from '../../../../components/page-content'
import pageModel from '../../../../components/page-model'

import { formConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'
import { usePageSearch } from '../../../../hooks/usePageSearch'
import { usePageModel } from '../../../../hooks/usePageModel'
import { useStore } from '../../../../store'

export default defineComponent({
  name: 'department',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    // 动态添加上级部门
    const store = useStore()
    const modelConfigRef = computed(() => {
      const parentId = modelConfig.formItems.find((item) => item.field === 'parentId')
      parentId!.options = store.state.entireDepartment.map((item) => ({ title: item.name, value: item.id }))

      return modelConfig
    })

    // 调用hook获取公共变量和函数
    const { pageModelRef, defaultInfo, editBtnClick, newBtnClick } = usePageModel(undefined, undefined)

    return {
      formConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      contentTableConfig,
      pageModelRef,
      defaultInfo,
      editBtnClick,
      newBtnClick,
      modelConfigRef
    }
  }
})
</script>

<style scoped></style>
