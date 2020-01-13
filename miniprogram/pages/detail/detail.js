// miniprogram/pages/detail/detail.js
const db = wx.cloud.database();
const goodsCollection = db.collection('goods');
Page({
  data: {
    goods: [],
    id: null
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    console.log(this.data.id);
    console.log(typeof this.data.id, '传过来的id的数据类型');
    goodsCollection
        .where({
          _id: this.data.id
        })
        .get()
        .then(res => {
            if(res.data[0].content !== '') {
              res.data[0].content = res.data[0].content.replace(/(。)/g, '。\n\n').replace(/(~)/g, '~\n\n').replace(/(:)/g, ':\n\n');
            }
            this.setData({
                goods: res.data
            });
            console.log(res.data);
            console.log(res.data[0].content.split('。').join('。\n\n').split('。'), 'content');
        });
    // this.data.content = this.data.content.split('。').join('。\n\n');
    // this.data.content = this.data.content.split('~').join('~\n\n');
  }
})