import { Calendar, Flex, Tabs } from '@taroify/core';
import { Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import dayjs from 'dayjs';
import './index.less';
import { useCallback, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { detailTimes } from 'src/store';

interface MonthDetailProps {
  store: {
    Store: {
      punchInfo: detailTimes;
    };
  };
}

type seriesTimes = {
  seriesTimes: number;
  notSeriesTimes: number;
};

type calendarData = {
  day: number;
  type: string;
}[];

const renderType = (day, type) => {
  if (type === 'A') {
    day.bottom = <text className="iconfont icon-jinghuaru"></text>;
  } else {
    day.bottom = <text className="iconfont icon-ruye"></text>;
  }
  day.children = type;
};

const MonthDetail: React.FC<MonthDetailProps> = props => {
  const punchInfo = props?.store?.Store.punchInfo;

  const FIGHTIMGSRC =
    'https://wx3.sinaimg.cn/mw2000/006TdVgDgy1h0892vb6zij30fs0dmdjb.jpg';

  const [seriesTimes, setSeriesTimes] = useState<seriesTimes>({
    seriesTimes: 0,
    notSeriesTimes: 0,
  });
  const [calendarData, setCalendarData] = useState<calendarData>([
    {
      day: 0,
      type: 'A',
    },
  ]);

  const fetchSeriesTimes = useCallback(() => {
    return Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'seriesTimes',
      },
      success: res => res?.result && setSeriesTimes(res.result as seriesTimes),
    });
  }, []);

  const fetchRenderCalendar = useCallback(() => {
    return Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'renderCalendar',
      },
      success: (res: TaroGeneral.IAnyObject) =>
        res?.result && setCalendarData(res.result.data),
    });
  }, []);

  useEffect(() => {
    fetchSeriesTimes();
    fetchRenderCalendar();
  }, []);

  const totalNums = [
    {
      id: 'year',
      text: '本月累计打卡',
      num: punchInfo.monthTimes,
      unit: '次',
    },
    {
      id: 'month',
      text: '本月坚持连续打卡',
      num: seriesTimes.seriesTimes,
      unit: '天',
    },
    {
      id: 'week',
      text: '本月最长连续',
      num: seriesTimes.notSeriesTimes,
      unit: '天没打卡',
    },
  ];

  const dayFormatter = (day: Calendar.DayObject) => {
    if (!day.value) {
      return day;
    }

    const date = day.value.getDate();

    calendarData.map(item => {
      if (date === item.day) {
        renderType(day, item.type);
      }
    });

    return day;
  };

  return (
    <view style={{ letterSpacing: 'normal' }}>
      <Flex justify="space-between" align="center" className="weekendCrad">
        <Flex.Item>
          <Flex direction="column" justify="center" className="textItem">
            {totalNums.map(item => {
              return (
                <Flex.Item className="totalText" key={item.id}>
                  <text>{item.text}</text>
                  <text>{item.num || '-'}</text>
                  <text>{item.unit}</text>
                </Flex.Item>
              );
            })}
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Image className="totalPic" src={FIGHTIMGSRC} mode="widthFix" />
        </Flex.Item>
      </Flex>

      <Tabs className="weekendCalen">
        <Tabs.TabPane title={dayjs().format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().toDate()}
            max={dayjs().toDate()}
            formatter={dayFormatter}
          />
        </Tabs.TabPane>
      </Tabs>
    </view>
  );
};

export default inject('store')(observer(MonthDetail));
