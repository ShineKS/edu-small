Page({
  //页面的初始化数据,和vue类似
  data: {
    requestResult: ''
  },
  //页面加载时触发。一个页面只会调用一次
  onLoad: function() {
    
  },
  //用户授权登录后的回调函数
  authCallback: function(data) {
    wx.loginApp(redirectIndex)
  }
})
//redirect主页
var redirectIndex= function() {
  //登录成功跳转主页
  wx.switchTab({
    url: '/pages/home/index/index'
  })
  }
