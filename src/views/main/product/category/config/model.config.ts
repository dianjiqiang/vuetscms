import { IFom } from '../../../../../base-ui/form'

export const modelConfig: IFom = {
  formItems: [
    {
      field: 'name',
      label: '类别名称',
      type: 'input',
      placeholder: '请输入部门名称'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
