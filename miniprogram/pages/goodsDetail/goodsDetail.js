// miniprogram/pages/detail/detail.js
const db = wx.cloud.database();
const goodsCollection = db.collection('goods');
const commentCollection = db.collection('comments');
Page({
  data: {
    goods: [],
    comments: [],
    comments_num: 0,
    id: null, // 根据id查找商品
    title: '' // 商品标题
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    goodsCollection
      .where({
        _id: this.data.id
      })
      .get()
      .then(res => {
        if (res.data[0].content !== '') {
          res.data[0].content = res.data[0].content.replace(/(。)/g, '。\n\n').replace(/(~)/g, '~\n\n');
        }
        this.setData({
          goods: res.data,
          title: res.data[0].title
        });
      })
      .then(() => {
        commentCollection
          .where({
            goods: this.data.title
          })
          .get()
          .then(res => {
            this.setData({
              comments: res.data,
              comments_num: res.data.length,
            })
            var length = this.data.comments.length + 1;
            console.log(length, '全部评论数据长度+1')
            var sortComment = this.data.comments.slice(res.data.length - 3).reverse();
            for (const i in sortComment) {
              sortComment[i].flag = Math.abs(sortComment[i].flag - length);
            }
            this.setData({
              comments: sortComment
            })
            console.log(res.data, '评论数据');
            console.log(this.data.comments, '最后三条评论数据');
          })
      });

  },
  showComment() {
    wx.navigateTo({
      url: '../commentDetail/commentDetail?goods=' + this.data.title,
      fail: function () {
        console.log('commentDetail跳转失败');
      },
      success: function () {
        console.log('commentDetail跳转成功');
      }
    })
  },
  // 分享功能
  onShareAppMessage() {
    return {
        title: this.data.title,
        path: 'pages/goodsDetail/goodsDetail?id=' + this.data.id,
        success: function() {
            console.log('分享成功')
        }
    }
}
})