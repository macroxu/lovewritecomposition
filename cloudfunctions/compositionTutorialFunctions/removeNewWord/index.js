const cloud = require('wx-server-sdk');
 
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context,openId) => {
   
  let wordId=event.wordId;
  await db.collection('newword').where(
    {
      _id: wordId,
    }
  ).remove();
  newwordList=await db.collection('newword').where({
    libId: openId,
  }).get();

  return newwordList;
};
