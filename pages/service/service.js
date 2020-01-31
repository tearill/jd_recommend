// miniprogram/pages/service/service.js
import util from '../../utils/util.js'
Page({
  data: {
    navScrollLeft: 0,
    navData: [],
    currentTab: 0,
    currentOption: 0, // 当前选中的条件按钮
    selected: false, // 是否选择了筛选
    orders: [], // 所有订单信息
    currData: [], // 当前tab下数据
    apply_order: [], // 售后申请订单
    deal_order: [], // 处理中订单
    comment_order: [], // 售后评价订单
    apply_record: [], // 申请记录
    inputValue: '', // 输入框内部，判断显示清除所有文字，取消输入时清空文本
    cancelShowed: false,
    scrollTop: 0, // 控制顶部滑动距离
    floorstatus: false, // 是否显示回到顶部
    isRuleTrue: false // 控制是否显示弹出的选择菜单
  },
  onReady() {
    this.animation = wx.createAnimation()
  },
  onLoad() {
    util.request('http://localhost:1314/servicePage')
      .then(res => {
        console.log(res)
        this.setData({
          navData: res.data.navData
        })
      })
    util.request('http://localhost:1314/accountPage')
      .then(res => {
        console.log(res)
        this.setData({
          orders: res.data.orderData
        })
        this.dealData()
      })
      .then(() => {
        this.fillData(0)
      })

  },
  switchNav(e) { // 切换导航栏
    let cur = e.currentTarget.dataset.current
    this.setData({
      currentTab: cur,
      scrollTop: 0 // 切换导航栏之后应该显示在页面顶部
    })
    this.fillData(cur)
  },
  searchText(str) {
    let currData = []
    this.data.currData.forEach(val => {
      if (val.title.toLowerCase().indexOf(str.toLowerCase()) >= 0) {
        currData.push(val)
      }
      // if(val.child_order != '') {
      //   val.child_order.forEach(item => {
      //     if(item.title.indexOf(str) >= 0) {
      //       currData.push(val)
      //     }
      //   })
      // }
    });
    this.setData({
      currData
    })
  },
  gainContent(e) { // 获取输入框内容
    const text = e.detail.value;
    console.log(typeof text)
    this.setData({
      inputValue: text
    })
    this.searchText(text)
    if (text === '') {
      this.fillData(this.data.currentTab)
    }
    console.log(typeof text, 'typeOf text');
  },
  deleteContent() { // 删除输入框内容
    this.setData({
      inputValue: ''
    })
    this.fillData(this.data.currentTab)
  },
  showCancel() { // 显示取消
    this.setData({
      cancelShowed: true
    })
  },
  hideCancel() { // 隐藏取消
    this.setData({
      cancelShowed: false,
      inputValue: ''
    })
    this.fillData(this.data.currentTab)
  },
  goTop(e) { // 回到顶部
    this.setData({
      scrollTop: 0
    })
  },
  scroll(e) { // 滚动事件
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    let floorstatus = false
    if (e.detail.scrollTop > 100) {
        floorstatus = true
    }
    this.setData({
      floorstatus
    })
  },
  dealData() { // 处理分类数据
    let apply_order = []
    let deal_order = []
    let comment_order = []
    let apply_record = []
    this.data.orders.forEach(val => {
      if (val.pay === true && val.receive === true) { // 可以申请售后的订单
        apply_order.push(val)
      }
      if (val.dealing === true) { // 处理中的订单
        deal_order.push(val)
      }
      if (val.appied === true) { // 申请过的订单
        apply_record.push(val)
      } else if (val.dealing === false) { // 申请过并且不在处理中 --- 完成售后
        comment_order.push(val)
      }
    })
    this.setData({
      apply_order,
      deal_order,
      comment_order,
      apply_record
    })
  },
  fillData(index) { // 设置数据，填坑
    let currData = []
    if (index === 0) {
      currData = this.data.apply_order
    } else if (index === 1) {
      currData = this.data.deal_order
    } else if (index === 2) {
      currData = this.data.comment_order
    } else if (index === 3) {
      currData = this.data.apply_record
    }
    this.setData({
      currData
    })
  },
  showSelect() { // 显示选择菜单
    this.setData({
      isRuleTrue: true
    })
    // 左偏移245 step表示一个动作的开始
    this.animation.translate(-245, 0).step()
    this.setData({ animation: this.animation.export() })
  },
  reset() { // 重置选择菜单选项
    this.setData({
      currentOption: 0
    })
  },
  success: function () { // 关闭选择菜单
    this.setData({
      isRuleTrue: false,
      selected: true
    })
    if (this.data.currentOption === 0) { // 如果在选择了全部按钮的时候关闭菜单，不显示选中时的筛选
      this.setData({
        selected: false
      })
    }
    this.animation.translate(0, 0).step()
    this.setData({ animation: this.animation.export() })
  },
  select(e) { // 切换选择的按钮
    let cur = e.currentTarget.dataset.id
    // console.log(typeof cur) // String
    this.setData({
      currentOption: parseInt(cur)
    })
  },
  to_after_market(e) { // 跳转选择售后类型
    let service = e.currentTarget.dataset.service // 是否可以申请售后标记
    let id = e.currentTarget.dataset.id // 申请售后的商品的id
    console.log(service)
    console.log(id)
    if (service) {
      wx.navigateTo({
        url: '../afterMarket/afterMarket?id=' + id
      })
    }
  }
})