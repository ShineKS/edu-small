Page({
  //该页面是初始化页面,用于判断登录状态
  onLoad: function () {
    /*定义微信全局的权限请求,session为家长端的访问控制 token是机构端的访问控制
     在登录小程序时初始化session,在机构登录时初始化token
   */
    wx.Global = {
      domain: "http://127.0.0.1:8080",
      user: "",
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'token': '',
        'session': ''
      }
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            "withCredentials": true,
            "success": function (data) {
              //初始化全局user主体
              wx.Global.user = data
              //执行登录操作
              wx.switchTab({
                url: '/pages/index/index'
              })
            },
            "fail": res
          })
        }else{
          wx.redirectTo({
            url:'/pages/login/login'
          })
        }
      }
    })
  }
})

