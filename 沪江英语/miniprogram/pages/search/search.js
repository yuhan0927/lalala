// miniprogram/pages/search/search.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    word:[
      "双语美文",
      "英语",
      "雅思",
      "四级",
      "六级"
    ],
    articles: [],
    search_list:[
    ],
    is_hidden: true
  },
  // 输入时匹配含有输入内容的字段
 searchInput: function(e) {
    console.log(e.detail)
    // 将搜索内容存入缓存
    wx.setStorageSync('keywords', e.detail); 
    // 调用getList方法搜索数据
    let search_list = this.getList(e.detail);
    if (e.detail == "") {
      search_list = [];
      this.data.is_hidden = true;
    } else {
      this.data.is_hidden = false;
    }
    this.setData({
      search_list,
      is_hidden: this.data.is_hidden
    });
  },
  onSearch(e) {
  //  将缓存中的keywords值赋值给keywords
    const keywords = wx.getStorageSync('keywords');
    wx.showLoading({
      title: '请稍等',
    });
    setTimeout(() => {
      this.setData({
        articles: this.getList(keywords),
        is_hidden: true
      });
      wx.hideLoading();
    }, 500);
  },
  showItemDetail(e) {
    const articledesc = e.currentTarget.dataset.articledesc.toLowerCase();
    wx.showLoading({
      title: '请稍等',
    })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        articles: this.getList(articledesc),
        is_hidden: true
      });
    }, 500)
  },
  getList(attr) {
    let self = this
    return self.data.allAticle.filter(item => {
      return item.articledesc.toString().toLowerCase().indexOf(attr) > -1;
    });
  },
  onCancel() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection("ShanghaiEnglish").get().then(res => {
      let data = res.data[0].articles
      const flatterArticle = data.reduce((pre, next) => {
        return pre.concat(next.article);
      }, [])
      that.setData({
        allAticle: flatterArticle
      })
      console.log(flatterArticle)
    })
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