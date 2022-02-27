// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID, APPID } = cloud.getWXContext();
  const { month } = event;

  const data = await db
    .collection('detailPunch')
    .where({ _openid: OPENID, month })
    .get();

  return data;
};
