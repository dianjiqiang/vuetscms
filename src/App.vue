<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import zhCn from 'element-plus/lib/locale/lang/zh-cn' //element-plus 国际化
export default defineComponent({
  setup() {
    const store = useStore()
    const name = store.state.name
    return {
      name,
      zhCn
    }
  }
})
</script>
<style></style>
