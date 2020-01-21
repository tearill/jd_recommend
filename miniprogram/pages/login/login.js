// miniprogram/pages/login/login.js
const loginCacheKey = 'Login:Flag'
Page({
  data: {

  },
  onLoad() {

  },
  // 获取手机号
  getPhoneNumber(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    wx.login({
      success: function () {
        wx.setStorage({
          key: loginCacheKey,
          data: 1
        });
        wx.switchTab({
          url: '../user/user'
        })
      },
      fail: function () {
        wx.setStorage({
          key: loginCacheKey,
          data: 1
        });
        wx.switchTab({
          url: '../user/user'
        })
      }
    })

    // setTimeout(() => {
    //   wx.switchTab({
    //     url: '../user/user'
    //   })
    // }, 2000);
  }
})