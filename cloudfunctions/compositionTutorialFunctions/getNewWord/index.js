const cloud = require('wx-server-sdk');
const wxContext = cloud.getWXContext();
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context,openId) => {
 
  newwordList=await db.collection('newword').where({
    libId: openId,
  }).get();

  return newwordList;
};
