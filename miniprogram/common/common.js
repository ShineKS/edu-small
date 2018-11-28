/**
 * 该js用于小程序初始化的方法和共用的定义
 */
function AppInit () {
  console.log("小程序初始化.....")
  wx.Global = {
    domain: "http://127.0.0.1:8080",
    user: "",
    header: {
      'token': '',
      'session': ''
    }
  }
  //设置一些请求的属性
  var reqSet = function (obj) {
    obj.url = wx.Global.domain + obj.url
    obj.header = wx.Global.header
    obj.header["content-type"] = 'application/json;charset=UTF-8'
  }

  //用于全局发起带权限的请求
  wx.AuthPostReq = function (obj) {
    reqSet(obj);
    obj.method = "POST"
    wx.request(obj)
  }
  //用于全局发起带权限的请求
  wx.AuthGetReq = function (obj) {
    reqSet(obj);
    obj.method = "GET"
    wx.request(obj)
  }
  //发起传统的form请求
  wx.AuthFormPostReq = function (obj) {
    reqSet(obj);
    obj.method = "POST"
    obj.header["content-type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
    wx.request(obj)
  }
   /*定义微信全局的权限请求,session为家长端的访问控制 token是机构端的访问控制
     在登录小程序时初始化session,在机构登录时初始化token
   */
  wx.loginApp = function (callBack) {
    wx.login({
      success(res) {
        console.log("小程序登录")
        console.log(res)
        if (res.code) {
          //获取用户信息后登录
          wx.getUserInfo({
            "withCredentials": true,
            "success": function (data) {
              console.log("获取用户信息成功")
              console.log(data)
              data.code=res.code
              wx.AuthPostReq({
                url: '/little_edu/smallapp/wxLogin',
                data:data,
                success(res) {
                  if (res.data.code === 0) {
                    wx.Global.header.session = res.data.data
                    //登录成功后执行
                    if (callBack instanceof Function) {
                      callBack();
                    }
                  } else {
                    wx.showToast({
                      title: '登录失败',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
  console.log("初始化完毕")
}

/**
 * 用于每次启动小程序的时候检测登录过期的重连
 */
function ReConnect(){
  wx.getSetting({
    success: res => {
      // 已经授权的情况下才刷新
      if (res.authSetting['scope.userInfo']) {
        wx.loginApp()
      }
    }
  })
}
module.exports.AppInit = AppInit
exports.ReConnect = ReConnect