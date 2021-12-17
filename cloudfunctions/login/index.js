// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let ress = [];
  let a = [];
  const db = cloud.database();
  ress = db
    .collection('dailyRecord')
    .doc('c0ca0aed61bb34c90099adaf09821208')
    .get();
  ress.then(res => {
    a = res;
  });

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    sum: event.a + event.b,
  };
};
