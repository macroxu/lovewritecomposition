// pages/goodSentence/index.js

 
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputKeyValue:'' ,//输入的关键词,
    hotwordList:[{'catalog':'美景',hotword:['春天','夏天','秋天']},
    {'catalog':'人物',hotword:['妈妈','爸爸','奶奶']}
  ]
  },
  onClick(){
    this.onSearchByKeyWord();
  },
  onSearch() {
    this.onSearchByKeyWord();
  },
  onTagTab(e){
    this.setData({inputKeyValue:e.currentTarget.dataset.id})
    this.onSearchByKeyWord();
  },
  onSearchByKeyWord(){
    //假如 查询信息不为空，跳转查询界面
    
    wx.navigateTo({
      url: `/pages/sentenceSearchResult/index?keyword=${this.data.inputKeyValue}`,
    });

  },
  onChange(e) {
    this.setData({
      inputKeyValue: e.detail,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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