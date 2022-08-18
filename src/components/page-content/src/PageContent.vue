<template>
  <div class="page-content">
    <keyie-table v-model:page="pageInfo" :list-data="listData" :listCount="listCount" v-bind="contentTableConfig">
      <!--标题插槽-->
      <template #header-handler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">新建用户</el-button>
        <el-button>
          <el-icon><refresh-right /></el-icon>
        </el-button>
      </template>
      <!--表格中的内容插槽-->
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" size="small">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div v-if="isUpdate" class="handle-btns">
          <el-button size="small" type="success" @click="editClick(scope.row)">
            <el-icon><edit-pen /></el-icon>
            <span>编辑</span>
          </el-button>
          <el-button v-if="isDelete" size="small" type="danger" @click="deleteClick(scope.row)">
            <el-icon><delete /></el-icon>
            <span>删除</span>
          </el-button>
        </div>
      </template>
      <!--在我们的pageContent中 插入我们剩余的插槽-->
      <template v-for="item of otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </keyie-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '../../../store'
import KeyieTable from '../../../base-ui/table'
import { usePermission } from '../../../hooks/usePermission'

export default defineComponent({
  name: 'PageContent',
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    KeyieTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    //获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')

    const store = useStore()
    const pageName = props.pageName

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    //发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.commit('system/setPageInfo', {
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size: pageInfo.value.pageSize
      })
      store.dispatch('system/getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize, // 后台属于由0开始的
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    const listData = computed(() => (store as any).state.system[`${pageName}List`])
    const listCount = computed(() => (store as any).state.system[`${pageName}Count`])
    // 获取其他动态插槽的名称
    const otherPropSlots = props.contentTableConfig.propsList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      return item.slotName !== 'handler'
    })

    // table 修改操作
    const editClick = (item: any) => {
      if (item.id <= 9) {
        // @ts-ignore
        ElMessageBox.alert(`所修改的ID不能小于9`, '警告')
      } else emit('editBtnClick', item)
    }
    // table 新建操作
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // table 删除操作
    const deleteClick = (item: any) => {
      if (item.id <= 9) {
        // @ts-ignore
        ElMessageBox.alert(`所删除的ID不能小于9`, '警告')
      } else {
        // @ts-ignore
        ElMessageBox.alert(`您确定删除用户名：${item.name}吗?`, '警告', {
          confirmButtonText: '确定',
          callback: (action: String) => {
            let message = '取消删除'
            if (action === 'confirm') {
              store.dispatch('system/deletePageDateAction', { pageName, id: item.id })
              message = `已删除${item.name}`
            }
            // @ts-ignore
            ElMessage({
              type: 'info',
              message: message
            })
          }
        })
      }
    }
    return {
      listData,
      getPageData,
      listCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      editClick,
      deleteClick,
      handleNewClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
