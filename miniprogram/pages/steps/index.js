import Page from '../../common/page';

Page({
  data: {
    icons: [
      'clock'
    ],
    steps: [
      {
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ]
  },
  icon: {
    normal:
      'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
    active:
      'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
  },
  jumpBtn: function (options) {
    wx.navigateTo({
      url: '../col/index',
    })
  },

  nextStep() {
    this.setData({
      active: ++this.data.active % 4
    });
  }
});
