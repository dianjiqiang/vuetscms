<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" center destroy-on-close title="新建用户" width="30%">
      <keyie-form v-model="formDate" v-bind="modelConfig" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import keyieForm from '../../../base-ui/form'
import { useStore } from '../../../store'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'page-model',
  components: {
    keyieForm
  },
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => {}
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formDate = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          formDate.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Reflect.ownKeys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formDate.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formDate.value, ...props.otherInfo }
        })
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
      }
    }

    return {
      dialogVisible,
      formDate,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
