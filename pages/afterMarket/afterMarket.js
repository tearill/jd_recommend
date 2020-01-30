// pages/afterMarket/afterMarket.js
import util from '../../utils/util.js'
Page({
  data: {
    orders: [], // 所有订单
    currData: [], // 当前申请售后的订单
    id: 0 // 订单id
  },
  onLoad(options) {
    let id = options.id // 传过来的商品id
    console.log(id)
    util.request('http://localhost:1314/accountPage')
      .then(res => {
        console.log(res)
        this.setData({
          orders: res.data.orderData,
          id
        })
      })
      .then(() => {
        this.dealData()
        
      })
  },
  dealData() { // 处理数据
    let currData = []
    this.data.orders.map(val => {
      if (val.id == this.data.id) {
        currData.push(val)
      }
    })
    this.setData({
      currData
    })
    console.log(this.data.currData)
  },
  to_fix() {
    wx.navigateTo({
      url: '../fix/fix'
    })
  }
})