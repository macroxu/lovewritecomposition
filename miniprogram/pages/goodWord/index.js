// pages/goodWord/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const { envList } = require('../../envList.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordCatalogList:[],
    inputKeyValue:'' ,//输入的关键字,
  },
  onClick(){
    this.onSearchByKeyChar();
  },
  onSearch() {
    this.onSearchByKeyChar();
  },

  onChange(e) {
    this.setData({
      inputKeyValue: e.detail,
    });
  },
  onSearchByKeyChar(){
    //假如 查询信息不为空，跳转查询界面
    wx.navigateTo({
      url: `/pages/goodWordSearchResult/index?keychar=${this.data.inputKeyValue}`,
    });

    //去除当前的搜索项
    this.setData({
      inputKeyValue: "",
    });

  },

  onTagTab(e){
    console.debug('你好');
    let subcatalog=e.currentTarget.dataset.id;
    let catalog=e.currentTarget.dataset.catalog;
    //Toast(subcatalog+catalog);
    wx.navigateTo({
      url: `/pages/goodWordShowList/index?catalog=${catalog}&subcatalog=${subcatalog}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      envId: envList[0].envId
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
        type: 'getWordCatalog'
      }
    }).then((resp) => {
      this.setData({
        wordCatalogList: resp.result.data
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