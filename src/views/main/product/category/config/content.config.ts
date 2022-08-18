const title = '商品类别'
const propsList = [
  { prop: 'name', label: '类别名称', minWidth: 100 },
  { prop: 'createAt', label: '创建时间', minWidth: 250, slotName: 'createAt' },
  { prop: 'updateAt', label: '更新时间', minWidth: 250, slotName: 'updateAt' },
  { label: '操作', minWidth: 180, slotName: 'handler' }
]

export const contentTableConfig = {
  title,
  propsList
}
