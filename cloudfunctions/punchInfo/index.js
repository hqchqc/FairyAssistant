// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const { OPENID, APPID } = cloud.getWXContext();
  // 查找数据库OPENID的相关数据
  const data = await db
    .collection('dailyRecord')
    .where({ _openid: OPENID })
    .get();

  return data;
};
