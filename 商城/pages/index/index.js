//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    curIndex: 0
  },

  onLoad: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    let that = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5cf268ad6b0a5b5ee89c0466/xiangwushuo/xiangwushuo',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        // console.log(res.data.data)
        let data = res.data.data
        that.setData({
          swiperOne: data.swiperOne,
          swiperTwo: data.swiperTwo,
          goods: data.goods,
          lists: data.lists,
          typeLists: data.typeLists,
          typeList: data.typeLists[that.data.curIndex].typeList
        })
        wx.hideLoading()
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  toList: function (e) {
    let that = this
    // console.log(e)
    let currentId = e.currentTarget.dataset.id
    // console.log(that.data.typeLists[currentId].typeList)
    that.setData({
      curIndex: e.currentTarget.dataset.id,
      typeList: that.data.typeLists[currentId].typeList
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
