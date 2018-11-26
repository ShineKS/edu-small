Page({
    //页面的初始化数据,和vue类似
    data: {
        requestResult: ''
    },
    //页面加载时触发。一个页面只会调用一次
    onLoad: function () {
        /*定义微信全局的权限请求,session为家长端的访问控制 token是机构端的访问控制
          在登录小程序时初始化session,在机构登录时初始化token
        */
        wx.Global = {
            domain:"",
            user: "",
            header: {
                'content-type': 'application/json;charset=UTF-8',
                'token': '',
                'session': ''
            }
        }
        //用于全局发起带权限的请求
        wx.AuthPostReq = function (obj) {
            obj.header = wx.Global.header
            obj.method = "POST"
            wx.request(obj)
        }
        //用于全局发起带权限的请求
        wx.AuthGetReq = function (obj) {
            obj.header = wx.Global.header
            obj.method = "GET"
            wx.request(obj)
        }
        //检查用户是否已经授权,如果授权,执行登录后跳转主页
        wx.getSetting({
            success (res) {
                var auth = res.authSetting
                if (auth.userInfo) {
                    wx.getUserInfo({
                        "withCredentials": true,
                        "success": function () {
                            //初始化全局user主体
                            wx.Global.user = data
                        },
                        "fail": res
                    })
                }
            }
        }),

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    //用户授权登录后的回调函数
    authCallback: function (data) {
        console.log("收到授权回调")
        //储存全局的用户信息
        wx.Global.user=data.detail.userInfo
        wx.login({
            success (res) {
                if (res.code) {
                    wx.AuthPostReq({
                        url: 'http://127.0.0.1:8080/little_edu/smallApp/wxLogin', //仅为示例，并非真实的接口地址
                        data: {
                            code: res.code,
                            rawData: data.rawData,
                            signature:data.signature
                        },
                        success (res) {
                            console.log(res.data)
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    }


})