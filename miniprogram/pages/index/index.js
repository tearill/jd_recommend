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
    onPullDownRefresh() {
        console.log('onPullDownRefresh');
        wx.showToast({
            title: '刷新完成',
            icon: 'success',
            duration: 2000
        })
    },
    onReachBottom() {
        console.log('触底了');
    },
    showDetail(e) {
        const id = e.currentTarget.dataset.id;
        console.log(id);
        // console.log(this.data.goods[0]);
        wx.navigateTo({
            url: "../detail/detail?id=" + id,
            fail: function() {
                console.log("detail跳转失败");
            },
            success: function(res) {
                console.log("detail跳转成功");
            }
        })
    }
})