<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" src="https://i.niupic.com/images/2022/01/28/9Umx.png"></el-avatar>
        <span style="margin-left: 10px">{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="exitUser">
            <el-icon><circle-close /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item @click="userMessage">
            <el-icon><avatar /></el-icon>
            <span>用户信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click="settingIO">
            <el-icon><setting /></el-icon>
            <span>系统管理</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../../store'
import localCache from '../../../utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'user-info',
  setup() {
    const router = useRouter()
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const exitUser = () => {
      const user = localCache.getCache('name')
      localCache.clearCache()
      localCache.setCache('name', user)
      router.replace('/login')
    }
    const userMessage = () => {
      router.push('/me')
    }
    const settingIO = () => {
      router.push('/main/system/user')
    }
    return {
      name,
      exitUser,
      userMessage,
      settingIO
    }
  }
})
</script>

<style lang="less" scoped>
.user-info {
  line-height: 30px;
  .el-dropdown {
    line-height: 30px;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
