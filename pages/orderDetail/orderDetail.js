// pages/orderDetail/orderDetail.js
import util from '../../utils/util.js'
Page({
  data: {
    orders: [], // 全部订单
    currData: [], // 当前订单详细信息
  },
  onLoad(options) {
    let id = parseInt(options.id)
    let currData = []
    // console.log(typeof id) // String
    util.request('http://localhost:1314/accountPage')
      .then(res => {
        this.setData({
          orders: res.data.orderData
        })
        this.dealData()
        this.data.orders.forEach(val => {
          if (val.id === id) {
            currData.push(val)
          }
        })
      })
      .then(() => {
        this.setData({
          currData
        })
        console.log(currData)
      })
  },
  dealData() { // 分类并处理相应数据
    // 设置订单状态
    this.data.orders.map(val => {
      if (val.cancel === false) { // 没取消
        if (val.pay === false) { // 没付款 --- 待付款
          val.status = '待付款'
        } else { // 付款了
          if (val.receive === false) { // 付了款但是没收到 --- 待收货
            val.status = '待收货'
          } else { // 付了款并且收到了 --- 已完成
            val.status = '完成'
          }
        }
      } else { // 已取消的订单
        val.status = '已取消'
      }
      console.log('deal')
    })
  },
  to_Seller() {
    wx.navigateTo({
      url: '../seller/seller'
    })
  }
})