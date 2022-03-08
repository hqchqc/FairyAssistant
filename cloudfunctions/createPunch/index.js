// 云函数入口文件
const cloud = require('wx-server-sdk');
const dayjs = require('dayjs');
cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID, APPID } = cloud.getWXContext();
  const { type } = event;
  const month = dayjs().month() + 1;
  const day = dayjs().date();
  const date = dayjs().format('YYYY-MM-DD');
  const data = await db
    .collection('detailPunch')
    .where({ _openid: OPENID, month, day })
    .get();
  const result = {};

  if (data.data.length === 0) {
    await db.collection('detailPunch').add({
      data: {
        _openid: OPENID,
        month,
        day,
        type,
        date,
      },
      success: res => {
        return (result = {
          state: 'SUCCESS',
        });
      },
    });
  } else {
    data.data.map(async item => {
      if (item.month === month && item.day === day) {
        await db
          .collection('detailPunch')
          .doc(item._id)
          .update({
            data: {
              type,
            },
            success: function (res) {
              return (result = {
                state: 'SUCCESS',
              });
            },
          });
      }
    });
  }

  return result;
};
