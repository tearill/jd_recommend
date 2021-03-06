//index.js
import util from '../../utils/util.js'
Page({
    data: {
        goods: []
    },
    onLoad() {
        console.log('onLoad');
        util.request('http://localhost:1314/goodsPage')
            .then(res => {
                console.log(res)
                this.setData({
                    goods: res.data.goods
                })
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
            url: "../goodsDetail/goodsDetail?id=" + id,
            fail: function () {
                console.log("goodsDetail跳转失败");
            },
            success: function (res) {
                console.log("goodsDetail跳转成功");
            }
        })
    },
    // 分享功能
    onShareAppMessage() {
        return {
            title: '什么值得买京东优选',
            path: 'pages/index/index',
            success: function () {
                console.log('分享成功')
            }
        }
    }
})