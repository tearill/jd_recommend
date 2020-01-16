const db = wx.cloud.database();
const commentCollection = db.collection('comments')
Page({
  data: {
    comments: []
  },
  onLoad(options) {
    const title = options.goods;
    console.log(title, '传过来的商品title')
    commentCollection
      .where({
        goods: title
      })
      .get()
      .then(res => {
        this.setData({
          comments: res.data
        })
        console.log(res.data, '全部评论数据')
      })
      .then(() => {
        var sortComment = this.data.comments.reverse();
        for (let i = 0, len = sortComment.length; i < len; i++) {
          var flag = sortComment[i].flag;
          if(flag === 1) {
            sortComment[i].flag = '沙发';
          }else if(flag === 2) {
            sortComment[i].flag = '椅子';
          }else if(flag === 3) {
            sortComment[i].flag = '板凳'
          }else {
            sortComment[i].flag += '楼';
          }
        }
        this.setData({
          comments: sortComment
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