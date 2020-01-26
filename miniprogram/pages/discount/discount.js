const loginCacheKey = 'Login:Flag';
Page({
  data: {
    navData: [], // 导航栏数据
    navScrollLeft: 0,
    currentTab: 0, // 当前导航栏
    discount: [], // 全部优惠券数据
    num1: 0, // 可用优惠券数量
    num2: 0, // 不可用优惠券数量
    currData: [], // 每个导航栏当前优惠券数据，初始为可用优惠券数据
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
        // let newNav = res.data.navData;
        // newNav[0].name = newNav[0].name + '(' + this.data.num1 + ')';
        // console.log(newNav, 'newNav')
        this.setData({
          navData: res.data.navData
        })
        // console.log(this.data.navData);
        // console.log(this.data.num, 'num in request')
      }
    });
    wx.request({ // 请求优惠券数据
      url: 'http://localhost:1314/discountPage',
      success: (res) => {
        this.setData({
          discount: res.data.discountData
        })
        console.log(this.data.discount);
        let usableData = []; // 可用优惠券数据
        let uselessData = []; // 不可用优惠券数量
        this.data.discount.map(val => { // 优惠券数据分类
          if (val.usable === true) {
            usableData.push(val)
          } else {
            uselessData.push(val)
          }
        })
        this.setData({
          uselessData,
          usableData,
          currData: usableData,
          num1: usableData.length,
          num2: uselessData.length
        })
        console.log(this.data.currData, '加载时的数据');
        // if (this.data.currData.length === 0) {
        //   this.setData({
        //     empty_usable: true
        //   })
        // }
      }
    });
  },
  switchNav(e) {
    const cur = e.currentTarget.dataset.current;
    console.log(cur, 'currentTab')
    this.setData({
      currentTab: cur
    });
    if (cur === 0) { // 设置可用优惠券
      this.setData({
        currData: this.data.usableData
      })
    } else { // 设置不可用优惠券
      this.setData({
        currData: this.data.uselessData
      })
    }
  },
  toUse() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})