<template>
  <div class="not-found">
    <h2>{{ message }}</h2>
    <el-button type="primary" @click="$router.replace(`${firstMenu?.url ?? '/login'}`)">回到主页</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { firstMenu } from '../../utils/map-menus'

export default defineComponent({
  name: 'not-found.vue',
  setup() {
    const message = ref('Not found!')
    return {
      message,
      firstMenu
    }
  }
})
</script>

<style scoped>
.not-found {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  height: 300px;
  text-align: center;
  margin: auto;
}
</style>
