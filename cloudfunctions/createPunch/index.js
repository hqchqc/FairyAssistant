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
  console.log(month, date, day);
  // 1. 查询改openid的所有记录
  // 2. 如果有记录
  //    查询记录下有没有当前月份
  //    有就更新
  // 3. 如果没有记录
  //    新增一条记录
  const data = await db
    .collection('detailPunch')
    .where({ _openid: OPENID })
    .get();
  console.log(data);
  if (data.data.length === 0) {
    const detail = {
      [type]: [day],
    };
    db.collection('detailPunch').add({
      data: {
        _openid: OPENID,
        month,
        detail,
        date,
      },
      success: res => console.log(res, 9991999),
    });
  }
  // else {
  // data.data.map(item => {
  //   if (item.month === month) {
  //     (await db.collection('detailPunch').where
  //       item.data[type])
  //       ? item.data[type].push(day)
  //       : (item.data[type] = [day]);
  //   }
  // });
  // }

  return data;
};
