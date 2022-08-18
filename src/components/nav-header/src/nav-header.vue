<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <expand v-show="flag" />
      <fold v-show="!flag" />
    </el-icon>
    <nav-breadcrumb :breadcrumbs="breadcrumbs" />
    <user-info />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '../../../store'
import { useRoute } from 'vue-router'
import userInfo from './user-info.vue'
import navBreadcrumb, { IBreadcrumb } from '../../../base-ui/breadcrumb'
import { pathMapBreadcrumb } from '../../../utils/map-menus'

export default defineComponent({
  name: 'nav-header',
  emits: ['foldChange'],
  components: { userInfo, navBreadcrumb },
  setup(_, { emit }) {
    const flag = ref(false)
    const store = useStore()
    const route = useRoute()
    const userMenu = store.state.login.userMenus
    const breadcrumbs = computed(() => pathMapBreadcrumb(userMenu, route.path))

    const handleFoldClick = () => {
      flag.value = !flag.value
      emit('foldChange', flag.value)
    }

    return {
      flag,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
