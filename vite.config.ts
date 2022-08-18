import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src', 'components')
      },
      {
        find: 'node_modules',
        replacement: path.resolve(__dirname, 'node_modules')
      },
      {
        find: 'views',
        replacement: path.resolve(__dirname, 'src', 'views')
      },
      {
        find: 'assets',
        replacement: path.resolve(__dirname, 'src', 'assets')
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, 'src', 'utils')
      }
    ]
  },
  build: {
    sourcemap: true
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000', //实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
