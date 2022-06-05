const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  let article= await db.collection('compositiontutorial').where({
    _id: event.articleId,
  }).get();
  console.debug(JSON.stringify(article));
  
  let singleArticle={}
  if(article.data.length>0)
  {
    singleArticle=article.data[0]
  }

  return singleArticle;
};
