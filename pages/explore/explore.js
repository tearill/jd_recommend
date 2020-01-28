// miniprogram/pages/explore/explore.js
import util from '../../utils/util.js'
Page({
    data: {
        goods: [], // 所有商品
        currData: [], // 当前分类下商品
        currentTab: 0,
        navScrollLeft: 0,
        category: '0', // 默认导航显示全部
    },
    onLoad() {
        console.log('onLoad');
        // wx.request({
        //     url: 'http://localhost:1314/goodsPage',
        //     success: res => {
        //         console.log(res)
        //         this.setData({
        //             goods: res.data.goods,
        //             currData: res.data.goods
        //         })
        //     }
        // })
        util.request('http://localhost:1314/goodsPage')
            .then(res => {
                this.setData({
                    goods: res.data.goods,
                    currData: res.data.goods
                })
            })
        util.request('http://localhost:1314/explorePage')
            .then(res => {
                const navData = res.data.navData;
                console.log(navData);
                this.setData({
                    navData
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
        console.log('触底了')
    },
    switchNav(e) {
        const cur = e.currentTarget.dataset.current;
        console.log(cur.toString());
        this.setData({
            currentTab: cur,
            category: cur,
            isEmpty: false
        });
        console.log(this.data.category);
        if (cur.toString() === '0') {
            this.setData({
                currData: this.data.goods
            })
        } else {
            console.log(this.data.category, 'data中的category');
            var num = this.data.category; // 标记当前分类
            console.log(typeof num, 'num类型');
            let currData = []
            this.data.goods.map(val => {
                if (val.category === num.toString()) {
                    currData.push(val)
                }
            })
            this.setData({
                currData
            })
        }
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
            path: 'pages/explore/explore',
            success: function () {
                console.log('分享成功')
            }
        }
    }
})