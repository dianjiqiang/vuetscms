<template>
  <div class="nav-menu">
    <div class="logo">
      <img alt="logo" class="img" src="~assets/img/logo.png" />
      <span v-if="isShow === false" class="title">{{ $store.state.name }}</span>
    </div>
    <el-menu
      :collapse="isShow"
      :default-active="defaultValue"
      active-text-color="#0a60bd"
      background-color="#0c2135"
      class="el-menu-vertical"
      text-color="#b7bdc3"
    >
      <template v-for="item of userMenus" :key="item.id">
        <!-- 判断二级菜单 -->
        <template v-if="item.children && item.children.length">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><component :is="iconsName(item.icon)" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem of item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <el-icon v-if="subitem.icon"><component :is="iconsName(subitem.icon)" /></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-sub-menu>
            <el-icon v-if="item.icon"><component :is="iconsName(item.icon)" /></el-icon>
            <span>{{ item.name }}</span>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../../../store'
import { pathMapToMenu } from '../../../utils/map-menus'

export default defineComponent({
  name: 'nav-menu',
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const userMenus = computed(() => store.state.login.userMenus)
    const menu = pathMapToMenu(userMenus.value, route.path)
    const defaultValue = ref(menu.id + '')

    const iconsName = (name: string) => {
      return name.split('-').slice(2).join('-')
    }
    const handleMenuItemClick = (item: any) => {
      router.push(item.url ?? 'not-found')
    }
    return {
      userMenus,
      iconsName,
      handleMenuItemClick,
      defaultValue
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  width: 100% + 1px;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }

  //目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(inner-selector) .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  .el-menu {
    border-right: none;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
