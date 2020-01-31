// pages/shopCart/shopCart.js
const loginCacheKey = 'Login:Flag';
Page({
  data: {
    flag: wx.getStorageSync(loginCacheKey) || 0,
    hasCart: false,  // 购物车是否为空
    cartgoods: [],    // 购物的商品
    selectAll: true, // 是否全选 
    totalPrice: "0.00",  // 优惠后的价格(合计)
    all_price: "0.00", // 优惠前的价格(总额)
    discount_price: "0.00", // 立减金额
    count: 0, // 选中的商品数量
    total_num: 0 // 全部商品的数量
  },
  onLoad() {
    this.setData({
      flag: wx.getStorageSync(loginCacheKey)
    })
  },
  onShow() {
    this.onLoad() // 从登录界面回来的时候要刷新一下
    let cartgoods = wx.getStorageSync('cart') || [];
    let count = 0
    let selectAll = false
    if (cartgoods.length === 0) {
      this.setData({
        cartgoods,
        hasCart: false
      })
      return
    }
    for (let item of cartgoods) {
      if (item.select === true) {
        count++
      }
    }
    if (count === cartgoods.length) {
        selectAll = true
    }
    this.setData({
      cartgoods,
      hasCart: true,
      count,
      selectAll
    })
    this.getTotalPrice()
    this.get_total_num()
  },
  go_login() { // 去登录
    wx.navigateTo({
      url: '../login/login?prev=cart'
    })
  },
  getTotalPrice() { // 获取商品总额,优惠后的价格,优惠的价格
    let cartgoods = this.data.cartgoods
    let totalPrice = 0 // 优惠后价格(合计)
    let all_price = 0 // 优惠前价格(总额)
    let discount_price = 0 // 优惠的价格(立减)
    for (let item of cartgoods) {
      if (item.select) {
        all_price += parseInt(item.price) * parseInt(item.num);
        totalPrice = all_price - (parseInt(item.discount) * parseInt(item.num))
        discount_price += parseInt(item.discount) * parseInt(item.num)
      }
    }
    this.setData({
      all_price,
      totalPrice,
      discount_price
    })
    console.log(all_price)
  },
  select(e) { // 选择商品
    let index = e.target.dataset.index
    console.log(index)
    let cartgoods = this.data.cartgoods
    let count = 0 // 计算当前选中的商品数
    cartgoods[index].select = !cartgoods[index].select
    
    wx.setStorage({
      key: 'cart',
      data: cartgoods
    })
    this.getTotalPrice()
    this.get_total_num()
    for (let item of cartgoods) {
      if (item.select === true) {
        count++
      }
    }
    this.setData({
      count,
      cartgoods
    })
    this.is_select_all()
  },
  is_select_all() { // 判断是否全部选中
    let cartgoods = this.data.cartgoods
    let count = 0
    let selectAll = false
    for (let item of cartgoods) {
      if (item.select === true) {
        count++
      }
    }
    if (count === cartgoods.length) {
        selectAll = true
    }
    this.setData({
      selectAll
    })
  },
  select_all() { // 全选商品
    let selectAll = this.data.selectAll
    selectAll = !selectAll
    let cartgoods = this.data.cartgoods
    for (let item of cartgoods) {
      item.select = selectAll
    }
    this.setData({
      selectAll,
      cartgoods
    })
    wx.setStorage({
      key: 'cart',
      data: cartgoods
    })
    this.getTotalPrice()
    this.get_total_num()
  },
  change_num(e) { // 改变商品数量
    let index = e.target.dataset.index
    let val = e.detail
    let cartgoods = this.data.cartgoods
    cartgoods[index].num = val
    cartgoods[index].select = true
    this.getTotalPrice()
    this.get_total_num()
    wx.setStorage({
      key: 'cart',
      data: cartgoods
    })
    this.setData({
      cartgoods
    })
    this.is_select_all()
  },
  go_to_pay() { // 去付款
    let cartgoods = this.data.cartgoods
    let selected = []
    cartgoods.forEach(val => {
      if(val.select === true) {
        selected.push(val)
      }
    });
    wx.navigateTo({
      url: '../buy/buy?selceted=' + selected
    })
  },
  goDetail(e) { // 去商品详情
    let cartgoods = this.data.cartgoods
    let index = e.currentTarget.dataset.index
    // console.log(index)
    wx.navigateTo({
      url: '../jd/jd?id=' + cartgoods[index].id
    })
  },
  delete_goods(e) { // 删除商品
    let index = e.currentTarget.dataset.index
    let cartgoods = this.data.cartgoods
    let that = this
    console.log(index)
    wx.showModal({
      title: '',
      content: '确认要删除此商品吗?',
      success: function(res) {
        if(res.confirm) {
          console.log('confirm')
          // console.log(cartgoods[index])
          cartgoods.splice(index, 1)
          // console.log(cartgoods)
          that.setData({
            cartgoods
          })
          wx.setStorage({
            key: 'cart',
            data: cartgoods
          })
          that.getTotalPrice()
          if(cartgoods.length === 0) { // 如果删空了购物车里所有的商品
            that.setData({
              hasCart: false
            })
          }
        }else if(res.cancel) {
          console.log('cancel')
        }
      }
    })
    this.getTotalPrice()
    this.get_total_num()
  },
  get_total_num() { // 计算商品总件数
    let cartgoods = this.data.cartgoods
    let total_num = 0
    cartgoods.forEach(val => {
      if(val.select === true) {
        total_num += val.num
      }
    })
    this.setData({
      total_num
    })
  }
})