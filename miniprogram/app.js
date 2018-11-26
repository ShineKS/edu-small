//app.js
App({
  //小程序初始化完成时触发，全局只触发一次。
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}
  },
  //小程序启动，或从后台进入前台显示时触发。
  onShow: function (options) {
   
  },
  //小程序从前台进入后台时触发。
  onHide: function () {
    
  },
  //小程序发生脚本错误，或者 api 调用失败时触发。
  onError: function (msg) {
    console.log(msg)
  },
})