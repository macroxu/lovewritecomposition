const cloud = require('wx-server-sdk');
const pinyin = require("pinyin");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  let wordList= await db.collection('wordv1').where({
    catalog: event.catalog,
    subcatalog:event.subcatalog
  }).get();
  console.debug(JSON.stringify(wordList));
  
  for(const word of  wordList.data)
  {
      let name=new String(word.name);
      let firstPinyin=pinyin(name.substr(0,1));
      word["firstPinyin"]=firstPinyin[0];

  }
  //
   

  return wordList;
};
