<template>
  <div class="crumbs">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item of breadcrumbs" :key="item.name">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from './type'

export default defineComponent({
  name: 'breadcrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.crumbs {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px;

  .el-breadcrumb {
    line-height: 30px;
  }
}
</style>
