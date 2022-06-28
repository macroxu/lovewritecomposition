const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context,openId) => {
  //保存查询记录
  let date = new Date();
  // 格式化创建时间为 2020-05-09 21:30
  let creat_date_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
  
  //保存查询日志
   db.collection('sentencesearchlog').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      openId:openId,
      keyword:event.keyword,
      searchDate:creat_date_time
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  });


  let keyword=event.keyword;
  // 返回数据库查询结果
  let sentencekeywordrelationresourse= await db.collection('sentencekeywordrelationresourse').where({
    sentencekeyword: keyword
  }).get();

  //查处一组sentenceId
  let sentenceids=sentencekeywordrelationresourse.data[0].sentenceids;

  //查找sentence by sentenceId
  const _ = db.command
  sentences=await db.collection('sentence').where({
    id: _.in(sentenceids)
  })
  .get();

  let newSentenceList=[];
  for(let id of sentenceids)
  {
    sentences.data.forEach(element => {
      if(element.id==id)
      {
        newSentenceList.push(element);
      }
    });


  }
 
  sentences.data=newSentenceList;
  console.debug(JSON.stringify(sentences));

  return sentences;
};
