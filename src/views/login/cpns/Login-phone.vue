<template>
  <div class="login-account">
    <!--这里调整的是我们的 label的宽度-->
    <el-form ref="formRef" :model="account" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" placeholder="请输入手机号" type="text" />
      </el-form-item>
      <el-form-item label="验证码" prop="authCode">
        <el-input v-model="account.authCode" class="authCodeInput" type="text" />
        <el-button class="authCodeBtn" type="primary">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
import type { ElForm } from 'element-plus'

// rules 是element-plus 集成的 async-validator 库对我们 input做的限制
import { rules } from './config/phone-config'
import localCache from '../../../utils/cache'
import { useStore } from 'vuex'

type FormInstance = InstanceType<typeof ElForm>

export default defineComponent({
  name: 'Login-account',
  props: ['isKeepPassword'],
  setup(props) {
    const store = useStore()
    const account = reactive({
      phone: localStorage.getItem('phone') ?? '',
      authCode: ''
    })
    const formRef = ref<FormInstance>()

    const loginPhone = (value: UnwrapRef<boolean>) => {
      if (value) {
        if (props.isKeepPassword) {
          localCache.setCache('phone', account.phone)
        } else {
          localCache.deleteCache('phone')
        }
      }
      store.dispatch('login/phoneLoginAction', { ...account })
    }

    return {
      account,
      rules,
      loginPhone,
      formRef
    }
  }
})
</script>

<style scoped>
.authCodeInput {
  width: 70px;
}
.authCodeBtn {
  margin-left: 25px;
}
</style>
