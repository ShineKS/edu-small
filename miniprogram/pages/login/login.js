Page({
  //页面的初始化数据,和vue类似
  data: {
    requestResult: ''
  },
  //页面加载时触发。一个页面只会调用一次
  onLoad: function() {
   
    //用于全局发起带权限的请求
    wx.AuthPostReq = function(obj) {
      obj.url = wx.Global.domain + obj.url
      obj.header = wx.Global.header
      obj.method = "POST"
      wx.request(obj)
    }
    //用于全局发起带权限的请求
    wx.AuthGetReq = function(obj) {
      obj.url = wx.Global.domain + obj.url
      obj.header = wx.Global.header
      obj.method = "GET"
      wx.request(obj)
    }
  },
  //用户授权登录后的回调函数
  authCallback: function(data) {
   lgoinApp()
  }
})
//执行小程序的登录逻辑
var lgoinApp= function() {
    wx.login({
      success(res) {
        console.log("收到的登录res" + res)
        if (res.code) {
          wx.AuthPostReq({
            url: '/little_edu/smallapp/wxLogin',
            data: {
              code: res.code
            },
            success(res) {
              if(res.data.code===0){
                wx.Global.header.session = res.data
              //登录成功跳转主页
              wx.switchTab({
                url: '/pages/index/index'
              })
              }else{
                wx.showToast({
                  title: '登录失败',
                  icon: 'success',
                  duration: 2000
                })
              }
          
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
