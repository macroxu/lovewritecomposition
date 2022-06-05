const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context,openId) => {
 
  let word=event.word;
  await db.collection('newword').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      libId:openId,
      word:word,
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  });
  newwordList=await db.collection('newword').where({
    libId: openId,
  }).get();

  return newwordList;
};
