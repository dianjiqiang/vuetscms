<template>
  <div class="page-search">
    <div class="search">
      <keyie-form v-model="formData" v-bind="formConfig">
        <template #footer>
          <el-button type="default" @click="ResetClick">
            <el-icon><refresh-right /></el-icon>
            <span>重置</span>
          </el-button>
          <el-button type="primary" @click="queryClick">
            <el-icon><search /></el-icon>
            <span>查找</span>
          </el-button>
        </template>
      </keyie-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import keyieForm from '../../../base-ui/form/src/KeyieForm.vue'

export default defineComponent({
  name: 'page',
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  emit: ['resetBtnClick', 'queryBtnClick'],
  components: { keyieForm },
  setup(props, { emit }) {
    // 这里双向绑定的数据 应该是由我们配置文件 field 来决定的
    // 优化1： formData中的属性 应该动态来决定
    const formItem = props.formConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItem) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const ResetClick = () => {
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    const queryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      ResetClick,
      queryClick
    }
  }
})
</script>

<style scoped>
.page-search {
}
</style>
