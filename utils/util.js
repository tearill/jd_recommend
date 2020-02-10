const request = myUrl => {
  wx.showLoading({
    title: '加载中' //提示的内容
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: myUrl,
      success: res => {
        wx.hideLoading();
        resolve(res);
      },
      fail: res => {
        wx.hideLoading();
        reject(res);
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  })
}

module.exports = {
  request
}