// miniprogram/pages/user/user.js
Page({
  data: {

  },
  onLoad(options) {

  },
  showAbout() {
    wx.navigateTo({
      url: '../about/about',
      success: function () {
        console.log('about跳转成功');
      },
      fail: function () {
        console.log('about跳转失败');
      }
    })
  },
  showFeedback() {
    wx.navigateTo({
      url: '../feedback/feedback',
      success: function () {
        console.log('feedback跳转成功');
      },
      fail: function () {
        console.log('feedback跳转失败');
      }
    })
  }

})