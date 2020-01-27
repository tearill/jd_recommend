Page({
  data: {
    navData: [],
    navScrollLeft: 0,
    currentTab: 0, // 当前导航栏
    orders: [], // 所有订单信息
    currData: [], // 当前导航栏下订单信息，从orders[]中查询放进来
    pay_data: [], // 待付款订单
    receive_data: [], // 待收货订单
    done_data: [] // 已完成订单
  },
  onLoad(options) {
    let that = this
    let index = options.index;
    // this.setData({
    //   currentTab: index
    // })
    // console.log(index, 'index') // typeof index => String
    // console.log(typeof this.data.currentTab, 'type')
    this.getData('http://localhost:1314/accountPage') // 请求数据
      .then(res => {
        // console.log(res, '1111111111111111111')
        that.setData({
          navData: res.data.navData, // 导航栏数据
          orders: res.data.orderData, // 所有订单数据
          currentTab: index
        })
      })
      .then(() => {
        that.dealData()
        // console.log(that.data.pay_data, 'index++++++')
        that.setData({
          currData: that.data.pay_data
        })
      })
  },
  switchNav(e) { // 切换导航栏
    let cur = e.currentTarget.dataset.current;
    console.log(cur);
    this.setData({
      currentTab: cur
    });
    this.fillData(cur)
  },
  dealData() { // 分类并处理相应数据
    let pay_data = [];
    let receive_data = [];
    let done_data = [];
    this.data.orders.map(val => {
      if (val.cancel === false) { // 没取消
        if (val.pay === false) { // 没付款 --- 待付款
          pay_data.push(val)
        } else { // 付款了
          if (val.receive === false) { // 付了款但是没收到 --- 待收货
            receive_data.push(val)
          } else { // 付了款并且收到了 --- 已完成
            done_data.push(val)
          }
        }
      } else { // 已取消的订单
        val.status = '已取消'
      }
    })
    // 设置订单状态
    pay_data.map(val => { val.status = '待付款' })
    receive_data.map(val => { val.status = '待收货' })
    done_data.map(val => { val.status = '已完成' })
    console.log(pay_data, 'pay');
    console.log(receive_data, 'receive');
    console.log(done_data, 'done');
    this.setData({
      pay_data,
      receive_data,
      done_data
    })
  },
  fillData(index) { // 设置数据，填坑
    if (index === 0) {
      this.setData({
        currData: this.data.orders
      })
    } else if (index === 1) {
      this.setData({
        currData: this.data.pay_data
      })
    } else if (index === 2) {
      this.setData({
        currData: this.data.receive_data
      })
    } else if (index === 3) {
      this.setData({
        currData: this.data.done_data
      })
    }
    console.log(this.data.currData, 'currData')
  },
  getData(myUrl) { // 获取数据
    return new Promise((resolve, reject) => {
      wx.request({
        url: myUrl,
        success: res => resolve(res)
      })
    })
  }

})