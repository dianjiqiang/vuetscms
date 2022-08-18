<template>
  <div class="list">
    <page-content :content-table-config="contentTableConfig" page-name="story" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '../../../../components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'list',
  components: { pageContent },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
