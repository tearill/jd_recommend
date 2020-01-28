const request = myUrl => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: myUrl,
      success: res => resolve(res),
      fail: res => reject(res)
    })
  })
}

module.exports = {
  request
}