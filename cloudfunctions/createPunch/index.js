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
  // 1. 查询该openid的所有记录
  // 2. 如果有记录
  //    查询记录下有没有当前月份
  //    有就更新
  // 3. 如果没有记录
  //    新增一条记录
  const data = await db
    .collection('detailPunch')
    .where({ _openid: OPENID, month })
    .get();
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
  } else {
    data.data.map(async item => {
      if (item.month === month) {
        await db
          .collection('detailPunch')
          .doc(item._id)
          .update({
            data: {
              detail: item.detail.type
                ? item.detail.type.push(day)
                : {
                    [type]: [day],
                  },
            },
            success: function (res) {
              console.log(res.data);
            },
          });
      }
    });
  }

  return data;
};
