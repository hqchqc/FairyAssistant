// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  try {
    return await db.collection('dailyRecord').add({
      data: {
        userId: wxContext.OPENID, //获取操作者_openid的方法
        type: event.type,
        date: event.date,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
