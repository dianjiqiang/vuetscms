<template>
  <div class="login-account">
    <!--这里调整的是我们的 label的宽度-->
    <el-form ref="formRef" :model="account" :rules="rules" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入您的账号" type="text" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" placeholder="请输入您的密码" show-password type="text" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef, onMounted } from 'vue'
import type { ElForm } from 'element-plus'

// rules 是element-plus 集成的 async-validator 库对我们 input做的限制
import { rules } from './config/account-cofig'
import localCache from '../../../utils/cache'
import { useStore } from 'vuex'

type FormInstance = InstanceType<typeof ElForm>

export default defineComponent({
  name: 'Login-account',
  props: ['isKeepPassword'],
  setup(props) {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<FormInstance>()

    onMounted(() => {
      if (!account.name) {
        account.password = ''
        localCache.deleteCache('password')
      }
    })

    const loginAction = (value: UnwrapRef<boolean>) => {
      // validate就是我们的验证
      formRef.value?.validate((isValid) => {
        //只有当我们的逻辑正确的时候 我们的isValid的时候才是true
        if (isValid) {
          localCache.setCache('name', account.name)
          if (props.isKeepPassword) {
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('password')
          }

          //开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
