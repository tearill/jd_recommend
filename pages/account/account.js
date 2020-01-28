import util from '../../utils/util.js'
Page({
  data: {
    navData: [],
    navScrollLeft: 0,
    currentTab: 0, // 当前导航栏
    orders: [], // 所有订单信息
    currData: [], // 当前导航栏下订单信息，从orders[]中查询放进来
    pay_data: [], // 待付款订单
    receive_data: [], // 待收货订单
    done_data: [], // 已完成订单
    scrollTop: 0, // 控制顶部滑动距离
    floorstatus: false // 是否显示回到顶部
  },
  onLoad(options) {
    let that = this
    let index = wx.getStorageSync('account:index');
    // this.setData({
    //   currentTab: index
    // })
    // console.log(index, 'index') // typeof index => String
    // console.log(typeof this.data.currentTab, 'type')
    util.request('http://localhost:1314/accountPage') // 请求数据
      .then(res => {
        that.setData({
          navData: res.data.navData, // 导航栏数据
          orders: res.data.orderData, // 所有订单数据
          currentTab: index
        })
        console.log('get')
        that.dealData()
      })
      .then(() => {
        // console.log(that.data.pay_data, 'index++++++')
        that.setData({
          currData: that.fillData(that.data.currentTab)
        })
        console.log('set')
      })
  },
  switchNav(e) { // 切换导航栏
    let cur = e.currentTarget.dataset.current;
    console.log(cur);
    this.setData({
      currentTab: cur,
      scrollTop: 0 // 切换导航栏之后应该显示在页面顶部
    });
    this.fillData(cur)
  },
  showDetail(e) { // 跳转订单详情界面
    let cur = e.currentTarget.dataset.id
    console.log(cur)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id=' + cur
    })
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
      console.log('deal')
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
    let orders = this.data.orders
    let pay_data = this.data.pay_data
    let receive_data = this.data.receive_data
    let done_data = this.data.done_data
    if (index === 0) {
      this.setData({
        currData: orders
      })
    } else if (index === 1) {
      this.setData({
        currData: pay_data
      })
    } else if (index === 2) {
      this.setData({
        currData: receive_data
      })
    } else if (index === 3) {
      this.setData({
        currData: done_data
      })
    }
    console.log(this.data.currData, 'currData')
  },
  goTop(e) { // 回到顶部
    this.setData({
      scrollTop: 0
    })
  },
  scroll(e) { // 滚动事件
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  }
})