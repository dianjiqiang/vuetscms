//导入vue包
import { createApp } from 'vue'
import App from './App.vue'
//导入其他js封装/库
import router from './router/index'
import store, { setupStore } from './store/index'
import { activateIcons, activateGlobal } from './global/register-properties'
//导入css
import './assets/css/index.less'

const app = createApp(App)

setupStore() //页面重新加载 加载我们的store数据
activateIcons(app) //启用我们的element plus 中的图标
activateGlobal(app) //启用我们的 全局属性

app.use(router).use(store).mount('#app')
