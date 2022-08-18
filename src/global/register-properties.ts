import { App } from 'vue'
import * as Icons from '@element-plus/icons-vue'

import { formatUtcString } from '../utils/date-format'

export function activateIcons(app: App) {
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
  })
}

export function activateGlobal(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
