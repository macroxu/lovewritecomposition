const cloud = require('wx-server-sdk');
const pinyin = require("pinyin");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context,openId) => {

  //添加操作日志
  //保存查询记录
  let date = new Date();
  // 格式化创建时间为 2020-05-09 21:30
  let creat_date_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()

  //保存查询日志
  db.collection('wordsearchlog').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      openId: openId,
      catalog:event.catalog,
      subcatalog: event.subcatalog,
      searchDate: creat_date_time
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  });

  // 返回数据库查询结果
  let countResult = await db.collection('wordv1').where({
    catalog: event.catalog,
    subcatalog: event.subcatalog
  }).count();
  let count = countResult.total;
  let all = []
  for (let i = 0; i < count; i += 100) {
    let wordList = await db.collection('wordv1').where({
      catalog: event.catalog,
      subcatalog: event.subcatalog
    }).skip(i).get();
    all = all.concat(wordList.data)
  }

  for (const word of all) {
    let name = new String(word.name);
    let firstPinyin = pinyin(name.substr(0, 1));
    word["firstPinyin"] = firstPinyin[0];

  }
  //


  return {
    data: all
  };
};