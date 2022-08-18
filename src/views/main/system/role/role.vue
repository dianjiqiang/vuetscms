<template>
  <div class="role">
    <page-search :form-config="formConfig" />
    <PageContent
      :contentTableConfig="contentTableConfig"
      page-name="role"
      @editBtnClick="editBtnClick"
      @newBtnClick="newBtnClick"
    />
    <page-model
      ref="pageModelRef"
      :default-info="defaultInfo"
      :model-config="modelConfig"
      :other-info="otherInfo"
      page-name="role"
    >
      <template #default>
        <div class="menu-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            :props="{ children: 'children', label: 'name' }"
            node-key="id"
            show-checkbox
            @check="handelCheckChange"
          />
        </div>
      </template>
    </page-model>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent, nextTick } from 'vue'
import { useStore } from '../../../../store'

import pageSearch from '../../../../components/page-search'
import PageContent from '../../../../components/page-content'
import pageModel from '../../../../components/page-model'

import { formConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageModel } from '../../../../hooks/usePageModel'
import { menuMapLeafKeys } from '../../../../utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    pageSearch,
    pageModel
  },
  setup() {
    // 处理pageModel的hook
    // @ts-ignore
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const { defaultInfo, pageModelRef, editBtnClick, newBtnClick } = usePageModel(editCallback, undefined)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})

    const handelCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      formConfig,
      modelConfig,
      defaultInfo,
      pageModelRef,
      elTreeRef,
      menus,
      otherInfo,
      editBtnClick,
      newBtnClick,
      handelCheckChange
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
