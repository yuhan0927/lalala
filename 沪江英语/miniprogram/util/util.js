const db = wx.cloud.database();

module.export = {
  getArticals(id) {
    db.collection("ShanghaiEnglish").get().then(res => {
      let data = res.data[0].articles.find((item) => {
        return item.id == id;
      })
    })
  }
}