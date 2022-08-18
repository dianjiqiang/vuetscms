<template>
  <div class="logins">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/Login-panel.vue'

export default defineComponent({
  name: 'Login',
  setup() {
    return {}
  },
  components: {
    LoginPanel
  }
})
</script>

<style scoped>
.logins {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/loginsBackgroundImg.jpg') center;
  background-size: 100%;
}
</style>
