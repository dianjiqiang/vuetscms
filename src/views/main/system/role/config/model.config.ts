import { IFom } from '../../../../../base-ui/form'

export const modelConfig: IFom = {
  formItems: [
    {
      field: 'name',
      label: '角色名',
      type: 'input',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      label: '角色权限',
      type: 'input',
      placeholder: '请输入角色权限'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
