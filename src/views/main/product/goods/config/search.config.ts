import { IFom } from '../../../../../base-ui/form'

export const formConfig: IFom = {
  formItems: [
    {
      field: 'name',
      label: '商品名称',
      type: 'input',
      placeholder: '请输入商品名称'
    },
    {
      field: 'address',
      label: '商品地址',
      type: 'input',
      placeholder: '请输入商品地址'
    },
    {
      field: 'status',
      type: 'select',
      label: '商品状态',
      placeholder: '请输入商品状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px'
}
