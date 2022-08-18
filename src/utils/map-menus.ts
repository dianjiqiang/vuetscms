import type { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '../base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1. 先去加载默认所有的routes
  let allRoutes: RouteRecordRaw[] = []
  // @ts-ignore
  const routerFiles = import.meta.globEager('../router/main/*/*/*.ts') as Object
  for (const path in routerFiles) {
    // @ts-ignore
    allRoutes.push(routerFiles[path].default)
  }
  //2. 将我们已有的menu返回
  const _recurseGetRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (!firstMenu) {
          firstMenu = menu
        }
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }

export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  // console.log(userMenus)    // 检查接口用
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) return findMenu
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function pathMapBreadcrumb(userMenus: any[], currentPath: string): IBreadcrumb[] {
  const breadcrumb = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb.push({ name: menu.name })
        breadcrumb.push({ name: findMenu.name })
        break
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      breadcrumb.push({ name: menu.name, path: menu.url })
    }
  }
  return breadcrumb
}

export function mapMenusToPermissions(userMenus: any) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recuseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recuseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recuseGetLeaf(menuList)

  return leftKeys
}
