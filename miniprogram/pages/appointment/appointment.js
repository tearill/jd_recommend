// miniprogram/pages/appointment/appointment.js
const loginCacheKey = 'Login:Flag';
Page({
  data: {
    flag: wx.getStorageSync(loginCacheKey) || 0
  },
  onLoad() {
    this.setData({
      flag: wx.getStorageSync(loginCacheKey)
    })
    if (this.data.flag === 0) {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  onShow() {
    if (this.data.flag === 0) {
      wx.switchTab({
        url: '../user/user'
      })
    }
  }
})