// miniprogram/pages/articlels/articlels.js
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
  onLoad: function(options) {
    wx.showLoading({
      title: '玩命加载中',
    })
    let that = this
    // console.log(options)
    wx.setNavigationBarTitle({ // 设置当前标题
      title: options.navigationText
    })
    db.collection("ShanghaiEnglish").get().then(res => {
       let data = res.data[0].articles.find((item) => {
        return item.id == options.id;
        // console.log(data.article)
      })
      that.setData({
        articles:data.article,
        totalId:data.article.length,
        typeListId:data.article.typeListId
      })
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})