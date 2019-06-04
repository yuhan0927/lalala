var WxParse = require('../../wxParse/wxParse.js')
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中',
    })
    let that = this
    that.setData({
      id:options.id,
      totalId:options.totalId,
      typeListId:options.typeListId
      })
    db.collection("ShanghaiEnglish").get().then(res => {
      let data = res.data[0].articles.find((item) => {
        return item.id == options.typeListId;
      })
      that.setData({
        article:data.article
      })
      let id = that.data.id
      that.setData({
        author: that.data.article[id].author,
        time:that.data.article[id].day,
        title:that.data.article[id].articledesc,
        content:that.data.article[id].content,
      })
    var content = that.data.content;
    WxParse.wxParse('content', 'html', content, that, 5);
    wx.setNavigationBarTitle({ // 设置当前标题
      title: that.data.title
    })
      wx.hideLoading();
   })
  },
  nextArticle: function(e) {
    let that = this
    let currentTargetID = e.currentTarget.dataset.id
    let totalId = that.data.totalId
    if(currentTargetID < totalId - 1){
      let nextTarget = Number(currentTargetID)+1
      wx.navigateTo({
        url: 'content?id=' + that.data.article[nextTarget].articleId + '&totalId=' + that.data.totalId + '&typeListId=' + that.data.article[nextTarget].typeListId
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '别贪心哦~已经没有内容了',
        showCancel: false,
        success: function (res) {
        } })
        return;
    }
},
  backHome:function() {
    wx.switchTab({
    url: '/pages/index/index'
  })
  },
  onShareAppMessage() {
    return {
      path: `/pages/content/content`,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})