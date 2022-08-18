export const rules = {
  user: [
    {
      required: true,
      message: '请输入您的用户名',
      trigger: 'blur' //trigger 是对我们input做的验证  blur是失去焦点触发的验证，change是我们改变的时候触发验证
    },
    {
      //第二个参数可以写上我们的正则
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入您的密码',
      trigger: 'blur'
    },
    {
      //第二个参数可以写上我们的正则
      pattern: /^[a-z0-9]{3,16}$/,
      message: '用户名必须是3-16个字母或者数字',
      trigger: 'blur'
    }
  ]
}
