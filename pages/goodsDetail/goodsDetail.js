// miniprogram/pages/detail/detail.js
import util from '../../utils/util.js'
Page({
  data: {
    goods: [],
    currData: [],
    comments: [],
    comments_num: 0,
    id: null, // 根据id查找商品
    title: '' // 商品标题，查评论
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    util.request('http://localhost:1314/goodsPage')
      .then(res => {
        let cur = [];
        let comment = [];
        res.data.goods.map(val => { // 当前商品
          if (val._id === options.id) {
            cur.push(val)
          }
        })
        console.log(cur, 'cur')
        // 处理商品详情描述
        cur[0].content = cur[0].content.replace(/(。)/g, '。\n\n').replace(/(~)/g, '~\n\n');
        res.data.comments.map(val => {
          if (val.goods === cur[0].title) {
            comment.push(val)
          }
        })
        // console.log(comment, 'all comments')
        // 开始处理评论数据
        var length = comment.length + 1;
        console.log(length, '全部评论数据长度+1')
        var sortComment = comment.slice(length - 4).reverse(); // 取出前三条评论，并且按照时间先后排序
        for (const i in sortComment) {
          sortComment[i].flag = Math.abs(sortComment[i].flag - length);
        }
        console.log(sortComment, '取出来排好序的三条评论')
        this.setData({
          goods: cur,
          comments: sortComment,
          comments_num: length - 1
        })
        // console.log(this.data.goods[0].title, 'goods')
      })
  },
  showComment() {
    wx.navigateTo({
      url: '../commentDetail/commentDetail?goods=' + this.data.goods[0].title,
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
      title: this.data.goods[0].title,
      path: 'pages/goodsDetail/goodsDetail?id=' + this.data.id,
      success: function () {
        console.log('分享成功')
      }
    }
  }
})