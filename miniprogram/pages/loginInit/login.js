Page({
  //页面的初始化数据,和vue类似
  data: {
    requestResult: ''
  },
  //页面加载时触发。一个页面只会调用一次
  onLoad: function() {
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            "withCredentials": true,
            "success": function(data) {
              //初始化全局user主体
              wx.Global.user = data
              //执行登录操作
              lgoinApp()
            },
            "fail": res
          })
        }
      }
    })
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
