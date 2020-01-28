import util from '../../utils/util.js'
Page({
  data: {
    comments: []
  },
  onLoad(options) {
    const title = options.goods;
    console.log(title, '传过来的商品title')
    util.request('http://localhost:1314/goodsPage')
      .then(res => {
        console.log(res.data.comments)
        let comments = []
        res.data.comments.map(val => { // 取出当前商品对应的评论
          if (val.goods === title) {
            comments.push(val)
          }
        })
        console.log(comments, 'all comments')
        comments.reverse().map(val => {
          let flag = val.flag
          if (flag === 1) {
            val.flag = '沙发';
          } else if (flag === 2) {
            val.flag = '椅子'
          } else if (flag === 3) {
            val.flag = '板凳'
          } else {
            val.flag += '楼'
          }
        })
        // console.log(comments, 'dealed comments')
        this.setData({
          comments
        })
      })
    console.log(this.data.comments, '存储的comments')
  },
  onPullDownRefresh() {
    wx.showToast({
      title: '刷新完成',
      icon: 'success',
      duration: 2000
    })
    console.log('onPullDownRefresh');
  }
})