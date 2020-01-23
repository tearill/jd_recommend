const loginCacheKey = 'Login:Flag';
Page({
  data: {
    navData: [],
    navScrollLeft: 0,
    currentTab: 0,
    discount: [],
    currData: [],
    empty_usable: false,
    empty_useless: false,
    flag: wx.getStorageSync(loginCacheKey) || 0
  },
  onLoad() {
    this.setData({ // 登录标识
      flag: wx.getStorageSync(loginCacheKey)
    })
    if (this.data.flag === 0) { // 去登录
      wx.navigateTo({
        url: '../login/login'
      })
    }
    wx.request({ // 请求导航栏数据
      url: 'http://localhost:1314/discountPage',
      success: (res) => {
        this.setData({
          navData: res.data.navData
        })
        console.log(this.data.navData);
      }
    });
    wx.request({ // 请求优惠券数据
      url: 'http://localhost:1314/discountPage',
      success: (res) => {
        this.setData({
          discount: res.data.discountData
        })
        console.log(this.data.discount);
      },
      complete: () => {
        let usableData = []; // 可用优惠券数据
        this.data.discount.map((val) => { // 优惠券数据分类
          if (val.usable === true) {
            usableData.push(val);
          }
        });
        this.setData({
          currData: usableData
        });
        console.log(this.data.currData, '加载时的数据');
        if (this.data.currData.length === 0) {
          this.setData({
            empty_usable: true
          })
        }
      }
    });
  },
  switchNav(e) {
    const cur = e.currentTarget.dataset.current;
    console.log(cur, 'currentTab')
    this.setData({
      currentTab: cur
    });
    let usableData = []; // 可用优惠券数据
    let uselessData = []; // 不可用优惠券数据
    this.data.discount.map((val) => { // 优惠券数据分类
      if (val.usable === true) {
        usableData.push(val);
      } else {
        uselessData.push(val);
      }
    });
    if (cur === 0) { // 设置可用优惠券
      console.log(usableData, 'usable');
      if (usableData.length === 0) { // 可用优惠券为空
        this.setData({
          empty_usable: true,
          empty_useless: false
        })
      } else { // 可用优惠券不为空
        this.setData({
          empty_usable: false,
          empty_useless: true
        })
      }
      this.setData({
        currData: usableData
      })
    } else { // 设置不可用优惠券
      console.log(uselessData, 'useless');
      if (uselessData.length === 0) { // 可用优惠券为空
        this.setData({
          empty_useless: true,
          empty_usable: false
        })
      } else { // 可用优惠券不为空
        this.setData({
          empty_useless: false,
          empty_usable: true
        })
      }
      this.setData({
        currData: uselessData
      })
    }
  },
  toUse() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})