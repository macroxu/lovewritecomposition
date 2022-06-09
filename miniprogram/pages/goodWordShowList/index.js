// pages/goodWordShowList/index.js

const {
  envList
} = require('../../envList.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordList: [],
    indexList: ['A','B'],
    wordIndexList: [{
        anchor: 'A',
        words: []
      },
      {
        anchor: 'B',
        words: []
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    let _this = this;
    //查询好句
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'compositionTutorialFunctions',
      config: {
        env: envList[0].envId
      },
      data: {
        type: 'getWordByCatalogv1',
        catalog: options.catalog,
        subcatalog: options.subcatalog
      }
    }).then((resp) => {
      this.setData({
        wordList: resp.result.data
      });
      _this.onHandleResponseData(resp.result.data);


      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  onHandleResponseData(wordList) {
    let AZ = [];
    for (let i = 0; i < 26; i++) {
      let char = String.fromCharCode(65 + i);
      let model = {
        anchor: char,
        words: []
      }
      AZ.push(model);
    }

    //根据词组的首个字母，放数据到对应的
    for (let word of wordList) {
      console.debug(word.firstPinyin)
      let firstChar = (new String(word.firstPinyin)).substr(0, 1).toUpperCase();
      for (let itemChar of AZ) {
        if (itemChar.anchor == firstChar) {
          itemChar.words.push(word);
        }
      }
    }
    //删除没有的序列
    let lastIndexList = [];
    let lastAZ = [];
    for (let itemChar of AZ) {
      if (itemChar.words.length > 0) {
        lastIndexList.push(itemChar.anchor);
        lastAZ.push(itemChar);
      }
    };
    this.setData({
      wordIndexList: lastAZ
    });
    this.setData({
      indexList: lastIndexList
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