export interface IFormItem {
  label: string
  type: 'input' | 'password' | 'select' | 'datepicker'
  field: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: Boolean
}

export interface IFom {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
