export const rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11}$/,
      message: '请输入11位手机号',
      trigger: 'blur'
    }
  ],
  authCode: [
    {
      required: true,
      message: '请输入您的验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{5}/,
      message: '验证码必须是五位数字',
      trigger: 'blur'
    }
  ]
}
