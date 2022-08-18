<template>
  <div class="me">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ userInfo.name }}</span>
          <el-button class="button" type="text">Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
      <el-button @click="goToBack">返回主页</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../store'

export default defineComponent({
  name: 'Me',
  setup() {
    const store = useStore()
    const router = useRouter()

    const userInfo = store.state.login.userInfo

    const goToBack = () => {
      router.push('/main')
    }
    return {
      userInfo,
      goToBack
    }
  }
})
</script>

<style scoped>
.me {
  margin: 5%;
}
</style>
