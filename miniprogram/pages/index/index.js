//index.js
const db = wx.cloud.database();
const goodsCollection = db.collection('goods');
Page({
    data: {
        goods: []
    },
    onLoad() {
        console.log('onLoad');
        goodsCollection
        .get()
        .then(res => {
            this.setData({
                goods: res.data
            })
            console.log(res.data);
        })
    },
    onReachBottom() {
        console.log('触底了') 
    }
})