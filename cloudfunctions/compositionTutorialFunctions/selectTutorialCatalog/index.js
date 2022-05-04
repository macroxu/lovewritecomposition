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
  tutorialcatalog.data.forEach(element => {
    element.articles=[{'title':'articleName'}];
  });
   
  return tutorialcatalog;
};
