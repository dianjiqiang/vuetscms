<template>
  <div class="login-panel">
    <el-card class="card">
      <h1 class="title">后台管理系统</h1>
      <el-tabs v-model="currentTab" class="demo-tabs" stretch type="border-card">
        <el-tab-pane name="account">
          <template #label>
            <span>
              <el-icon><user /></el-icon>账号登录
            </span>
          </template>
          <!--账号密码输入框-->
          <LoginAccount ref="accountRef" :isKeepPassword="isKeepPassword" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span>
              <el-icon><iphone /></el-icon>手机登录
            </span>
          </template>
          <!--手机验证码输入框-->
          <LoginPhone ref="phoneRef" :isKeepPassword="isKeepPassword" />
        </el-tab-pane>
      </el-tabs>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button class="login-button" type="primary" @click="loginButton">立即登录</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginAccount from './Login-account.vue'
import LoginPhone from './Login-phone.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: { LoginAccount, LoginPhone },
  setup() {
    // 这样我们就可以获取到组件的属性
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const isKeepPassword = ref(false)
    const currentTab = ref<string>('account')

    const loginButton = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginPhone(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      loginButton,
      phoneRef,
      accountRef,
      currentTab
    }
  }
})
</script>

<style scoped>
.login-panel {
  margin-bottom: 120px;
}
.title {
  margin-top: -5px;
  text-align: center;
}
.card {
  width: 350px;
}
.account-control {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.login-button {
  margin-top: 10px;
  width: 100%;
  height: 40px;
}
</style>
