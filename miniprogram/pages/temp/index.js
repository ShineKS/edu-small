import Page from '../../common/page';

Page({

  /**
   * 页面跳转
   */
  jumpBtn: function (options) {
    wx.navigateTo({
      url: '../steps/index',
    })
  },
});
