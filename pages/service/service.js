// miniprogram/pages/service/service.js
Page({
  data: {
    navScrollLeft: 0,
    navData: [],
    currentTab: 0,
    currData: [], // 当前tab下数据
    inputValue: '', // 输入框内部，判断显示清除所有文字，取消输入时清空文本
    cancelShowed: false
  },
  onLoad() {
    wx.request({
      url: 'http://localhost:1314/servicePage',
      success: res=> {
        console.log(res)
        this.setData({
          navData: res.data.navData
        })
      }
    })
  },
  switchNav(e) {
    let cur = e.currentTarget.dataset.current
    this.setData({
      currentTab: cur
    })
  },
  gainContent(e) {
    const text = e.detail.value;
    this.setData({
      inputValue: text
    })
    console.log(typeof text, 'typeOf text');
  },
  deleteContent() {
    this.setData({
      inputValue: ''
    })
  },
  showCancel() {
    this.setData({
      cancelShowed: true
    })
  },
  hideCancel() {
    this.setData({
      cancelShowed: false,
      inputValue: ''
    })
  }

})