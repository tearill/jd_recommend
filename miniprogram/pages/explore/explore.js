// miniprogram/pages/explore/explore.js
const db = wx.cloud.database();
const goodsCollection = db.collection('goods');
Page({
    data: {
        goods: [],
        currentTab: 0,
        navScrollLeft: 0,
        category: '0', // 默认导航显示全部
        isEmpty: false // 控制内容为空时的图片是否显示
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
        wx.request({
            url: 'http://localhost:1314/explorePage',
            success: (res) => {
                console.log(res);
                const navData = res.data.navData;
                console.log(navData);
                this.setData({
                    navData
                })
            }
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
        if(cur.toString() === '0') {
            goodsCollection
            .get()
            .then(res => {
                this.setData({
                    goods: res.data
                })
                console.log(res.data,'全部数据');
            }) 
        }else {
            console.log(this.data.category,'data中的category');
            var num = this.data.category; // 标记当前分类
            console.log(typeof num, 'num类型');
            goodsCollection
            .where({
                category: num.toString()
            })
            .get()
            // {
            //     success: res => {
            //         this.setData({
            //             goods: res.data
            //         })
            //     },
            //     fail: err => {
            //         console.log('数据为空')
            //     }
            // }
            .then(res => {
                this.setData({
                    goods: res.data
                })
                console.log(res.data,'分类数据'); 
                if(this.data.goods.length === 0) {
                    this.setData({
                        isEmpty: true
                    })
                }else {
                    this.setData({
                        isEmpty: false
                    })
                }
            }) 
        }
    },
    showDetail(e) {
        const id = e.currentTarget.dataset.id;
        console.log(id);
        // console.log(this.data.goods[0]);
        wx.navigateTo({
            url: "../goodsDetail/goodsDetail?id=" + id,
            fail: function() {
                console.log("goodsDetail跳转失败");
            },
            success: function(res) {
                console.log("goodsDetail跳转成功");
            }
        })
    }
})