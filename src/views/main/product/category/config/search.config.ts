import { IFom } from '../../../../../base-ui/form'

export const formConfig: IFom = {
  formItems: [
    {
      field: 'name',
      label: '类别名称',
      type: 'input',
      placeholder: '请输入类别名称'
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
