// miniprogram/pages/feedback/feedback.js
import util from '../../utils/util.js'
Page({
  data: {
    type: [],
    index: 0,
    content: '',
    toastData: {}
  },
  onReady() {
    this.toast = this.selectComponent("#toast");
  },
  onLoad() {
    util.request('http://localhost:1314/feedbackPage') // 请求反馈类型数据
      .then(res => {
        this.setData({
          type: res.data.typeData
        });
        console.log(this.data.type, 'type')
      })
  },
  changeType(e) {
    const selectedIndex = e.detail.value;
    console.log(selectedIndex);
    this.setData({
      index: selectedIndex
    })
  },
  gainInput(e) {
    const text = e.detail.value;
    this.setData({
      content: text
    })
    console.log(typeof text, 'typeOf text');
  },
  submit() {
    if (this.data.content === '') {
      this.setData({
        toastData: {
          icon: "alert",
          info1: "请填写内容",
          top: "620rpx"
        }
      })
      this.toast.showToast()
      this.toast.hideToast()
    } else {
      this.setData({
        toastData: {
          icon: "success",
          info1: "提交成功",
          top: "620rpx"
        }
      })
      this.toast.showToast()
      this.toast.hideToast()
    }
    setTimeout(() => {
      wx.switchTab({
        url: '../user/user'
      })
    }, 2000);
  }

})