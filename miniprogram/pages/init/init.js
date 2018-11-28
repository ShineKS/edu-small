Page({
  //该页面是初始化页面,用于授权登录
  onLoad: function () {
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

