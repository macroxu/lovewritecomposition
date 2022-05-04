// pages/compositionTutorialCatalog/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tutorialCatalogList:[]
  },

  
  onClickCatalogInfo(e) {
    const index = e.currentTarget.dataset.index;
    const tutorialCatalogList = this.data.tutorialCatalogList;
    tutorialCatalogList[index].showItem = !tutorialCatalogList[index].showItem;
    
    this.setData({
      tutorialCatalogList
      });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      envId: options.envId
    });
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'compositionTutorialFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectTutorialCatalog'
      }
    }).then((resp) => {
      this.setData({
        tutorialCatalogList: resp.result.data
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})