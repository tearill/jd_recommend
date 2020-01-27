const requestPromise = myUrl => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: myUrl,
      success: res => resolve(res)
    })
  })
}

module.exports = requestPromise