<template>
  <div class="user">
    <pageSearch :form-config="formConfig" @queryBtnClick="handleQueryClick" @resetBtnClick="handleResetClick" />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @editBtnClick="editBtnClick"
      @newBtnClick="newBtnClick"
    />
    <page-model ref="pageModelRef" :defaultInfo="defaultInfo" :model-config="modelConfigRef" pageName="users" />
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
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup: function () {
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    // 是否预填数据和显示密码
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = true
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
    }
    // 动态添加部门和角色列表
    const store = useStore()
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find((item) => item.field === 'departmentId')
      const roleItem = modelConfig.formItems.find((item) => item.field === 'roleId')
      departmentItem!.options = store.state.entireDepartment.map((item) => ({ title: item.name, value: item.id }))
      roleItem!.options = store.state.entireRole.map((item) => ({ title: item.name, value: item.id }))

      return modelConfig
    })
    // 调用hook获取公共变量和函数
    const { pageModelRef, defaultInfo, editBtnClick, newBtnClick } = usePageModel(newCallback, editCallback)

    return {
      formConfig,
      contentTableConfig,
      modelConfigRef,
      pageContentRef,
      pageModelRef,
      handleQueryClick,
      handleResetClick,
      editBtnClick,
      newBtnClick,
      defaultInfo
    }
  }
})
</script>

<style lang="less" scoped></style>
