import { IFom } from '../../../../../base-ui/form'

export const formConfig: IFom = {
  formItems: [
    {
      field: 'name',
      label: '部门名称',
      type: 'input',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      label: '部门领导',
      type: 'input',
      placeholder: '请输入部门领导'
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
