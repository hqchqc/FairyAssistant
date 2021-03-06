const cloud = require('wx-server-sdk');
const dayjs = require('dayjs');

cloud.init();
const db = cloud.database();
const _ = db.command;
const COLLECTION = 'detailPunch';

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  try {
    // 1. 查询累计打卡次数
    if (event.function_name === 'recordTotal') {
      return (
        await db
          .collection(COLLECTION)
          .where({
            _openid: wxContext.OPENID,
          })
          .count()
      ).total;
    }
    // 2. 查询今年、本月、本周打卡次数
    if (event.function_name === 'detailTimes') {
      // 如果是周日要特殊处理 否则会算到下一周
      const weekDay = dayjs().day();
      const start =
        weekDay === 0
          ? dayjs().subtract(6, 'day').format('YYYY-MM-DD')
          : dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD');
      const end =
        weekDay === 0
          ? dayjs().format('YYYY-MM-DD')
          : dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD');

      const weekTimes = (
        await db
          .collection(COLLECTION)
          .where({
            _openid: wxContext.OPENID,
            date: _.gte(start).and(_.lte(end)),
          })
          .count()
      ).total;

      const monthTimes = (
        await db
          .collection(COLLECTION)
          .where({
            _openid: wxContext.OPENID,
            month: dayjs().month() + 1,
          })
          .count()
      ).total;

      const yearTimes = (
        await db
          .collection(COLLECTION)
          .where({
            _openid: wxContext.OPENID,
            year: dayjs().year(),
          })
          .count()
      ).total;

      return {
        weekTimes,
        monthTimes,
        yearTimes,
      };
    }
    // 3. 查询本月坚持连续打卡、最长连续几天没打卡
    if (event.function_name === 'seriesTimes') {
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const ddlData = await db
        .collection(COLLECTION)
        .where({
          _openid: wxContext.OPENID,
          date: _.gte(start).and(_.lte(dayjs().format('YYYY-MM-DD'))),
        })
        .orderBy('date', 'asc')
        .get();

      let seriesTimes = 1,
        notSeriesTimes = 0,
        len = ddlData.data.length - 1;

      if (len <= -1) {
        notSeriesTimes = dayjs().date();
      } else {
        // 统计连续几天打卡数
        for (let i = len; i > 0; i--) {
          if (ddlData.data[i].day - ddlData.data[i - 1].day === 1) {
            seriesTimes++;
          } else {
            break;
          }
        }

        // 统计最长连续几天没打卡
        const nowDate = dayjs().date(),
          clockInDay = [];
        ddlData.data.map(item => clockInDay.push(item.day));
        notSeriesTimes = clockInDay[0] - 1;
        for (let i = 1; i < clockInDay.length - 1; i++) {
          if (clockInDay[i + 1] - clockInDay[i] > notSeriesTimes) {
            notSeriesTimes = clockInDay[i + 1] - clockInDay[i];
          }
        }
      }

      return {
        seriesTimes,
        notSeriesTimes,
      };
    }
    // 4. 查询本月打卡详情(在日历中渲染)
    if (event.function_name === 'renderCalendar') {
      return await db
        .collection(COLLECTION)
        .where({
          _openid: wxContext.OPENID,
          month: dayjs().month() + 1,
        })
        .get();
    }
    // 5. 查询今日是否打卡
    if (event.function_name === 'isClockIn') {
      const isClcokIn = (
        await db
          .collection(COLLECTION)
          .where({
            _openid: wxContext.OPENID,
            day: dayjs().date(),
            month: dayjs().month() + 1,
          })
          .count()
      ).total
        ? true
        : false;
      return isClcokIn;
    }
    // 6. 打卡
    if (event.function_name === 'clockIn') {
      const { type } = event;
      let data = {};

      const isClockInToday = (
        await db
          .collection(COLLECTION)
          .where({
            _openid: wxContext.OPENID,
            day: dayjs().date(),
            month: dayjs().month() + 1,
          })
          .count()
      ).total
        ? true
        : false;

      if (!isClockInToday) {
        const result = await db.collection(COLLECTION).add({
          data: {
            _openid: wxContext.OPENID,
            year: dayjs().year(),
            day: dayjs().date(),
            month: dayjs().month() + 1,
            date: dayjs().format('YYYY-MM-DD'),
            type,
          },
        });

        if (result._id) {
          data = {
            state: 'SUCCESS',
          };
        } else {
          data = {
            state: 'FAILED',
            message: res,
          };
        }

        return data;
      } else {
        data = {
          state: 'FAILED',
          message: '今天已经打过卡了哦！',
        };
      }
      return data;
    }
  } catch (e) {
    return e;
  }

  // // 3. 查询打卡最多、评分最高、累计花费

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // };
};
