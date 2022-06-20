// pages/sentenceSearchResult/index.js
const { envList } = require('../../envList.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keychar:"",//
    wordList:[],
    noDataTip:"加载数据中...."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    wx.setNavigationBarTitle({
      title: "\""+options.keychar+"\""+"相关的好词",
    })

    //保存keyword
    this.setData({
      keychar: options.keychar
    });

    //查询好词
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'compositionTutorialFunctions',
      config: {
        env:  envList[0].envId
      },
      data: {
        type: 'getGoodWordByKeyChar',
        keychar: options.keychar
      }
    }).then((resp) => {
      this.setData({
        wordList: resp.result
        
      });
      if(resp.result.count==0)
        {
          this.setData({noDataTip:"我们加快充实这个查询的好词,敬请期待。"})
        }
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