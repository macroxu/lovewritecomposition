// 云函数入口文件
const cloud = require('wx-server-sdk')
 
const selectTutorialCatalog = require('./selectTutorialCatalog/index');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  switch (event.type) {
    case 'selectTutorialCatalog':
      return await selectTutorialCatalog.main(event, context);
  }



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}