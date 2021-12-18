// runDB云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const userId = cloud.getWXContext().OPENID;
const _ = db.command;
const MAX_LIMIT = 100; // 云函数限制最多一次性获取100条数据

// 云函数入口函数
exports.main = async (event, context) => {
  const targetDB = db.collection(event.db);
  event.data['userId'] = userId;

  try {
    if (event.type == 'insert') {
      return await targetDB.add({
        data: event.data,
      });
    }

    if (event.type == 'update') {
      return await targetDB.doc(event.indexKey).update({
        data: event.data,
      });
    }

    if (event.type == 'delete') {
      return await targetDB.where(event.condition).remove();
    }

    if (event.type == 'get') {
      //     .count();
      //   const total = countResult.total;
      //   const batchTimes = Math.ceil(total / 100);
      //   const tasks = [];
      //   for (let i = 0; i < batchTimes; i++) {
      //     const promise = targetDB
      //       .skip(i * MAX_LIMIT)
      //       .limit(MAX_LIMIT)
      //       .get();
      //     tasks.push(promise);
      //   }

      //   return (await Promise.all(tasks)).reduce((acc, cur) => {
      //     return {
      //       data: acc.data.concat(cur.data),
      //       errMsg: acc.errMsg,
      //     };
      //   });

      // 先取出集合记录总数
      const countResult = await targetDB
        .where({
          userId: userId,
        })
        .count();
      console.log(countResult);
      const total = countResult.total;
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100);
      // 承载所有读操作的 promise 的数组
      const tasks = [];
      for (let i = 0; i < batchTimes; i++) {
        const promise = targetDB
          .skip(i * MAX_LIMIT)
          .limit(MAX_LIMIT)
          .get();
        tasks.push(promise);
      }
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        };
      });
    }
  } catch (e) {
    console.error(e);
  }
};
