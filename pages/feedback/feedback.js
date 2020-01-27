// miniprogram/pages/feedback/feedback.js
Page({
  data: {
    type: [],
    index: 0,
    content: ''
  },
  onLoad() {
    wx.request({
      url: 'http://localhost:1314/feedbackPage',
      success: (res) => {
        this.setData({
          type: res.data.typeData
        });
        console.log(this.data.type, 'type')
      }
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
      wx.showToast({
        title: '请填写内容',
        image: '../../assets/icons/alert.png',
        duration: 2000,
        // complete: function () {
        //   setTimeout(function () {
        //     wx.switchTab({ // Toast中使用switchTab跳转界面
        //       url: '../user/user'
        //     })
        //   }, 2000) // 延迟跳转
        // }
      })
    } else {
      wx.showToast({
        title: '提交成功',
        image: '../../assets/icons/success.png',
        duration: 2000,
      })
    }
    setTimeout(() => {
      wx.switchTab({
        url: '../user/user'
      })
    }, 2000);
  }

})