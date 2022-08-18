import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import localCache from '../utils/cache'
import { firstMenu } from '../utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: `${firstMenu?.url ?? '/login'}`
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('views/login/Login.vue')
  },
  {
    name: 'Main',
    path: '/main',
    component: () => import('views/main/Main.vue')
  },
  {
    name: 'Me',
    path: '/me',
    component: () => import('views/me/Me.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  const name = localCache.getCache('name')
  const password = localCache.getCache('password')
  if (to.path !== '/login') {
    if (!token || !name) {
      return '/login'
    } else if (to.path === '/main') {
      return firstMenu.url
    }
  } else {
    if (token && name && password) {
      return firstMenu.url
    }
  }
})

export default router
