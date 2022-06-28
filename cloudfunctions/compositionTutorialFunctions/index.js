// 云函数入口文件
const cloud = require('wx-server-sdk')

const selectTutorialCatalog = require('./selectTutorialCatalog/index');
const getArticle = require('./getArticle/index');
const getSentenceKeyWord = require('./getSentenceKeyWord/index');
const getSentenceByKey = require('./getSentenceByKey/index');
const getSentenceByKeyv1 = require('./getSentenceByKeyv1/index');


const getWordCatalog = require('./getWordCatalog/index');
const getWordByCatalog = require('./getWordByCatalog/index');

const getCompositionTutorial = require('./getCompositionTutorial/index');
const getCompositionTutorialById = require('./getCompositionTutorialById/index');

const addNewWord = require('./addNewWord/index');
const removeNewWord = require('./removeNewWord/index');
const getNewWord = require('./getNewWord/index');

const getWordByCatalogv1=require('./getWordByCatalogv1/index');

const getGoodWordByKeyChar=require('./getGoodWordByKeyChar/index');

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let openId=wxContext.OPENID;
  switch (event.type) {
    case 'selectTutorialCatalog':
      return await selectTutorialCatalog.main(event, context);

    case 'getArticle':
      return await getArticle.main(event, context);

    case 'getSentenceKeyWord':
      return await getSentenceKeyWord.main(event, context);

    case 'getSentenceByKey':
      return await getSentenceByKey.main(event, context,openId);

    case 'getSentenceByKeyv1':
        return await getSentenceByKeyv1.main(event, context,openId);
  
      

    case 'getWordCatalog':
      return await getWordCatalog.main(event, context);

    case 'getWordByCatalog':
      return await getWordByCatalog.main(event, context);

    case 'getWordByCatalogv1':
      return  await getWordByCatalogv1.main(event, context);
    case 'getCompositionTutorial':
      return await getCompositionTutorial.main(event, context);
    case 'getCompositionTutorialById':
      return await getCompositionTutorialById.main(event, context);

    case 'addNewWord':
      return await addNewWord.main(event, context,openId);

    case 'removeNewWord':
      return await removeNewWord.main(event, context,openId);

    case 'getNewWord':
      return await getNewWord.main(event, context,openId);
    
      case 'getGoodWordByKeyChar':
        return await getGoodWordByKeyChar.main(event, context,openId);
  
      

  }



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}