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
        url: '../login/login?prev=user'
      })
    }
  },
  logout() {
    wx.setStorage({
      key: loginCacheKey,
      data: 0
    });
    wx.navigateTo({
      url: '../login/login?prev=user'
    })
  },
  showAbout() { // 跳转关于界面
    wx.navigateTo({
      url: '../about/about'
    })
  },
  showFeedback() { // 跳转反馈界面
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  showAppointment() { // 跳转预约界面
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: '../login/login?prev=appointment'
      })
    } else {
      wx.navigateTo({
        url: '../appointment/appointment'
      })
    }
  },
  showDiscount() { // 跳转优惠券界面
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: '../login/login?prev=discount'
      })
    } else {
      wx.navigateTo({
        url: '../discount/discount'
      })
    }

  },
  showOptions(e) { // 跳转账户选项界面
    let index = e.currentTarget.dataset.index;
    console.log(index);
    if (this.data.loginFlag === 0) {
      wx.navigateTo({
        url: '../login/login?prev=account'
      })
    }else if (index === 3) {
      wx.navigateTo({
        url: '../service/service'
      })
    } else {
      index = index + 1;
      if(index > 3) {
        index = 0
      }
      wx.navigateTo({
        url: '../account/account?index=' + index
      })
    }
  }

})