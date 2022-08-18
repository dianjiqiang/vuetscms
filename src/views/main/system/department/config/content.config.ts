const title = '用户列表'
const propsList = [
  { prop: 'name', label: '部门名称', minWidth: 100 },
  { prop: 'leader', label: '部门领导', minWidth: 100 },
  { prop: 'parentId', label: '上级部门', minWidth: 100 },
  { prop: 'createAt', label: '创建时间', minWidth: 250, slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: 250, slotName: 'updateAt' },
  { label: '操作', minWidth: 180, slotName: 'handler' }
]

export const contentTableConfig = {
  title,
  propsList
}
