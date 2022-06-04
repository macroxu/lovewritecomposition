const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  let keyword=event.keyword;
  // 返回数据库查询结果
  let sentence= await db.collection('sentence').where({
    content: db.RegExp({
        regexp: keyword,
        options: 'i',
      })
   
  }).get();
  console.debug(JSON.stringify(sentence));

  return sentence;
};
