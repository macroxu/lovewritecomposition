const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 好句关键词
  let sentencekeywordList= await db.collection('sentencekeyword').get();
  console.debug(JSON.stringify(sentencekeywordList));
  return sentencekeywordList;
};