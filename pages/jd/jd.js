// pages/jd/jd.js
//获取应用实例
const app = getApp()
import util from '../../utils/util.js'
Page({
  data: {
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '商品详情', //导航栏 中间的标题
    },
    toastData: { // toast需要的参数
      icon: "success",
      info1: "加入购物车成功",
      top: "50%"
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    id: 0, // 商品id --> 查找商品
    goods: [], // 所有商品信息
    currData: [], // 当前商品信息
    price_before_dot: '', // 价格小数点前的数字
    price_after_dot: '', // 价格小数点之后的数字
    imgList: [], // 所有图片的url地址
    self_sell: false, // 是否为自营店铺
    discountShow: false, // 是否显示优惠券卡片
    isGet: false, // 是否领取了优惠券
    promoteShow: false, // 是否展示促销卡片
    showModalStatus: false,
    choose_value: '版本一',
    currentOption: 0, // 默认选中版本
    num: 1, // 商品数量
    minShow: false, // 是否显示(最少一件)
    scrollTop: 0, // 控制顶部滑动距离
    floorstatus: false, // 是否显示回到顶部
    isRuleTrue: false, // 控制是否显示弹出的选择菜单
    allNum: 0,  //购物车的商品数量
  },
  onReady() {
    this.toast = this.selectComponent("#toast");
  },
  onLoad(options) {
    console.log(this.data.height)
    let id = options.id
    console.log(id)
    util.request('http://localhost:1314/goodsPage')
      .then(res => {
        console.log(res)
        this.setData({
          goods: res.data.goods,
          id
        })
        this.dealData()
        let split = this.data.currData[0].plain_price.split('.')
        console.log(split)
        let self_sell = false
        if (this.data.currData[0].store.indexOf("京东") >= 0 || this.data.currData[0].store.indexOf("自营") >= 0) {
          self_sell = true
        }
        this.setData({
          imgList: this.data.currData[0].images,
          price_before_dot: split[0],
          price_after_dot: split[1],
          self_sell
        })
        console.log(this.data.self_sell)
        console.log(this.data.imgList)
      })
  },
  onShow() {
    this.change_num()
  },
  dealData() { // 处理数据 --- 找出对应id的商品
    let currData = []
    this.data.goods.forEach(val => {
      if (val._id === this.data.id) {
        currData.push(val)
        console.log(val.store)
      }
    })
    this.setData({
      currData
    })
    console.log(currData)
  },
  enlargeImg(e) { // 放大图片
    let index = e.currentTarget.dataset.index
    let imgList = this.data.imgList
    wx.previewImage({
      current: imgList[index], // 当前图片地址
      urls: imgList // 所有要预览的图片的地址集合
    })
  },
  to_cart() { // 跳转购物车
    wx.switchTab({
      url: '../shopCart/shopCart'
    })
  },
  goTop(e) { // 回到顶部
    this.setData({
      scrollTop: 0
    })
  },
  scroll(e) { // 滚动事件
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    let floorstatus = false
    if (e.detail.scrollTop > 300) {
        floorstatus = true
    }
    this.setData({
      floorstatus
    })
  },
  to_seller() { // 跳转在线客服
    wx.navigateTo({
      url: '../seller/seller'
    })
  },
  showDiscount() { // 显示和隐藏优惠券卡片
    this.setData({
      discountShow: !this.data.discountShow
    })
  },
  showPromote() { // 显示和隐藏促销卡片
    this.setData({
      promoteShow: !this.data.promoteShow
    })
  },
  get_discount() { // 领取优惠券
    this.setData({
      toastData: { // toast需要的参数
        icon: "success",
        info1: "领取成功",
        info2: "5~10分钟到账",
        top: "50%"
      },
      isGet: true
    })
    this.toast.showToast()
    this.toast.hideToast()
  },
  onUnLoad() {
    clearTimeOut(this.data.timer1)
    clearTimeOut(this.data.timer2)
  },
  onShareAppMessage() { // 分享事件
    return {
      title: this.data.currData[0].title,
      path: 'pages/jd/jd?id' + this.data.id,
      imageUrl: this.data.imgList[0], // 设置分享的时候显示的图片(大图的第一张)
      success: function () {
        console.log('分享成功')
      }
    }
  },
  showModel() { // 显示上拉菜单
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    var timer1 = setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
    this.setData({
      timer1
    })
  },
  hideModal() { // 隐藏上拉菜单
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    var timer2 = setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
    this.setData({
      timer2
    })
  },
  select(e) { // 切换选择的类型
    let cur = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    // console.log(typeof cur) // String
    this.setData({
      currentOption: parseInt(cur),
      choose_value: type
    })
  },
  onChange(e) { // 数量选择器改变事件
    let num = e.detail
    let minShow = false
    console.log(num)
    if (num === 1) {
        minShow = true
    }
    this.setData({
      num,
      minShow
    })
  },
  minus(e) { // 点击减少
    let num = e.detail
    if (num === 0) {
      this.setData({
        num,
        minShow: true
      })
    }
  },
  addCart() { // 加入购物车
    if (this.data.num === 0) { // 没有点击数量选择器，直接加入购物车，最少一件商品
      this.setData({
        num: 1
      })
    }
    this.setData({
      toastData: { // toast需要的参数
        icon: "success",
        info1: "加入购物车成功",
        top: "50%"
      }
    })
    this.toast.showToast()
    this.toast.hideToast()
    this.hideModal()
    // 真正实现添加购物车的部分
    let cartData = wx.getStorageSync('cart') || [];
    let count = 0
    cartData.map(val => {
      if (val.title === this.data.currData[0].title && val.type === this.data.choose_value) {
        val.num += this.data.num
        count++ // 标记是否有找到相同的商品
      }
    })
    if (count === 0) { // 没找到 添加新的商品信息进购物车
      let data = {
        id: this.data.currData[0]._id,
        title: this.data.currData[0].title,
        weight: "0.78kg",
        type: this.data.choose_value,
        num: this.data.num,
        price: this.data.currData[0].plain_price,
        img: this.data.currData[0].thumb,
        discount: 20,
        select: true // 是否选中，方便后续计算总价
      }
      cartData.push(data)
    }
    // 刷新购物车图标上的数量
    let allNum = 0
    cartData.forEach(val => {
      allNum += val.num
    });
    console.log(allNum, 'num')
    this.setData({
      allNum
    })
    wx.setStorage({
      key: 'cart',
      data: cartData
    })
  },
  buy() {
    wx.navigateTo({
      url: '../buy/buy'
    })
  },
  change_num() {
    let cartgoods = wx.getStorageSync('cart') || [];
    let allNum = 0
    cartgoods.forEach(val => {
      allNum += val.num
    });
    console.log(allNum, 'num')
    this.setData({
      allNum
    })
  }
})