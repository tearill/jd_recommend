// miniprogram/pages/user/user.js
const loginCacheKey = 'Login:Flag'
Page({
  data: {
    loginFlag: 0,
    tag: '登录/注册',
    bean: 0,
    options: []
  },
  onLoad(options) {
    wx.request({
      url: 'http://localhost:1314/userPage',
      success: (res) => {
        this.setData({
          options: res.data.optionData
        })
        console.log(res.data.optionData);
      }
    })
    this.setData({
      loginFlag: wx.getStorageSync(loginCacheKey) || 0
    })
    if (this.data.loginFlag === 1) {
      this.setData({
        tag: 'Horace'
      })
    } else {
      this.setData({
        tag: '登录/注册'
      })
    };
  },
  onShow() {
    this.onLoad();
  },
  login() {
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: '../login/login',
        success: function () {
          console.log('login跳转成功');
        },
        fail: function () {
          console.log('login跳转失败');
        }
      })
    }
  },
  logout() {
    wx.setStorage({
      key: loginCacheKey,
      data: 0
    });
    wx.navigateTo({
      url: '../login/login'
    })
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
  },
  showAppointment() {
    wx.navigateTo({
      url: '../appointment/appointment',
      success: function () {
        console.log('appointment跳转成功');
      },
      fail: function () {
        console.log('appointment跳转失败');
      }
    })
  },
  showDiscount() {
    wx.navigateTo({
      url: '../discount/discount',
      success: function () {
        console.log('discount跳转成功');
      },
      fail: function () {
        console.log('discount跳转失败');
      }
    })
  },
  showOptions(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../account/account?index=' + index
      })
    }
  }

})