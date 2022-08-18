<template>
  <div class="chat">
    <keyie-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import keyieEditor from '../../../../base-ui/editor'

export default defineComponent({
  name: 'chat',
  components: {
    keyieEditor
  },
  setup() {
    const htmlString = ref<string>('Want to get you')
    return {
      htmlString
    }
  }
})
</script>

<style scoped></style>
