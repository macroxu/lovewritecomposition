// 云函数入口文件
const cloud = require('wx-server-sdk')
 
const selectTutorialCatalog = require('./selectTutorialCatalog/index');
const getArticle = require('./getArticle/index');
const getSentenceKeyWord = require('./getSentenceKeyWord/index');
const getSentenceByKey=require('./getSentenceByKey/index');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  switch (event.type) {
    case 'selectTutorialCatalog':
      return await selectTutorialCatalog.main(event, context);

      case 'getArticle':
      return await getArticle.main(event, context);
      
      case 'getSentenceKeyWord':
        return await getSentenceKeyWord.main(event, context);
      
      case 'getSentenceByKey':
        return await getSentenceByKey.main(event, context);
  }



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}