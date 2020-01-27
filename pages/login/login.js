// miniprogram/pages/login/login.js
const loginCacheKey = 'Login:Flag'
Page({
  data: {
    prev: ''
  },
  onLoad(options) {
    let pages = getCurrentPages(); // 当前界面
    let prevpage = pages[pages.length - 2]; // 跳转过来的界面
    console.log(options.prev, '跳转过来的界面');
    this.setData({
      prev: options.prev
    })
  },
  // 获取手机号
  getPhoneNumber(e) {
    var that = this;
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);

    wx.login({
      success: function () {
        // wx.setStorage({
        //   key: loginCacheKey,
        //   data: 1
        // });
        // wx.switchTab({ // 跳转tabBar页面
        //   url: '../user/user'
        // })
      },
      fail: function () {
        // wx.setStorage({
        //   key: loginCacheKey,
        //   data: 1
        // });
        // wx.switchTab({
        //   url: '../user/user'
        // })
      },
      complete: function () {
        wx.setStorage({
          key: loginCacheKey,
          data: 1
        });
        if (that.data.prev === 'user') {
          wx.switchTab({
            url: '../user/user'
          })
        } else {
          wx.navigateTo({
            url: '../' + that.data.prev + '/' + that.data.prev
          })
        }
      }
    })
  }
})