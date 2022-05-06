const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  let tutorialcatalog= await db.collection('tutorialcatalog').get();
  console.debug(JSON.stringify(tutorialcatalog))

  for (const element of tutorialcatalog.data) {
    //获取catalogID
    let catalogCode=element.catalogCode

    let articles= await db.collection('article').where({
      catalogCode: catalogCode,
    }).get()
    
    let articleDetailList=[]
    articles.data.forEach(element => {
      articleDetailList.push({'articleId':element.articleId,'title':element.title})
    });

    element.articles=articleDetailList;
  }
   
   
  return tutorialcatalog;
};
