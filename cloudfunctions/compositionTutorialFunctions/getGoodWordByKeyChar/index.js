const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context, openId) => {
  //保存查询记录
  let date = new Date();
  // 格式化创建时间为 2020-05-09 21:30
  let creat_date_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()

  //保存查询日志
  db.collection('wordsearchlog').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      openId: openId,
      keychar: event.keychar,
      searchDate: creat_date_time
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  });


  let keychar = event.keychar;
  // 返回数据库查询结果
  let wordResult = {}

  //查询普通的词语
  const $ = db.command.aggregate
  let wordList = await db.collection('wordv1').aggregate().match({
    name: db.RegExp({
      regexp: keychar,
      options: 'i',
    }),
    catalog: ""

  }).project({
    _id: 1,
    catalog: 1,
    subcatlog: 1,
    name: 1,
    nameLength: $.strLenBytes('$name')
  }).sort({
    nameLength: 1,
    name: 1
  }).limit(200).end()

  //查询叠词
  let dieciList = await db.collection('wordv1').aggregate().match({
    name: db.RegExp({
      regexp: keychar,
      options: 'i',
    }),
    catalog: "叠词"

  }).project({
    _id: 1,
    catalog: 1,
    subcatlog: 1,
    name: 1,
    nameLength: $.strLenBytes('$name')
  }).sort({
    nameLength: 1,
    name: 1
  }).limit(200).end()
  //查询成语
  let chengyuList = await db.collection('wordv1').aggregate().match({
    name: db.RegExp({
      regexp: keychar,
      options: 'i',
    }),
    catalog: "叠词"

  }).project({
    _id: 1,
    catalog: 1,
    subcatlog: 1,
    name: 1,
    nameLength: $.strLenBytes('$name')
  }).sort({
    nameLength: 1,
    name: 1
  }).limit(200).end()
  //查询歇后语
  let xiehouyuList= await db.collection('wordv1').aggregate().match({
    name: db.RegExp({
      regexp: keychar,
      options: 'i',
    }),
    catalog: "歇后语"

  }).project({
    _id: 1,
    catalog: 1,
    subcatlog: 1,
    name: 1,
    nameLength: $.strLenBytes('$name')
  }).sort({
    nameLength: 1,
    name: 1
  }).limit(200).end()

  wordResult={
    count:wordList.list.length+dieciList.list.length+chengyuList.list.length+xiehouyuList.list.length,
    'wordList':wordList.list,
    'dieciList':dieciList.list,
    'chengyuList':chengyuList.list,
    'xiehouyuList':xiehouyuList.list

  }

  console.debug(JSON.stringify(wordList));

  return wordResult;
};