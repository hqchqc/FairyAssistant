import { Calendar, Flex, Tabs, Toast } from '@taroify/core';
import { Image } from '@tarojs/components';
import fightPic from '@assets/Illustration/fight.svg';
import { punchInfo } from 'src/store';
import { observer, inject } from 'mobx-react';
import dayjs from 'dayjs';
import './index.less';
import { useCallback, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

interface MonthDetailProps {
  store: {
    Store: {
      punchInfo: punchInfo[];
    };
  };
}

const MonthDetail: React.FC<MonthDetailProps> = props => {
  const {
    store: {
      Store: { punchInfo },
    },
  } = props;

  const [value, setValue] = useState(1);
  const [initUseDate, setInitUseDate] = useState<TaroGeneral.IAnyObject>();

  const fetchUseData = useCallback(month => {
    return Taro.cloud.callFunction({
      name: 'punchCalc',
      data: {
        month,
      },
      success: (res: TaroGeneral.IAnyObject) => {
        res.result && setInitUseDate(res.result?.data[0]?.detail);
      },
      fail: err => Toast.fail(err.errMsg),
    });
  }, []);

  useEffect(() => {
    const month = dayjs().month() + 1;
    fetchUseData(month);
  }, []);

  const totalNums = [
    {
      id: 'year',
      text: '本月累计喝掉',
      num: punchInfo.length ? punchInfo[0]?.month?.times : '-',
      unit: '杯',
    },
    {
      id: 'month',
      text: '本月坚持连续打卡',
      num: punchInfo.length ? punchInfo[0]?.month?.seriesTimes : '-',
      unit: '天',
    },
    {
      id: 'week',
      text: '本月最长连续',
      num: punchInfo.length ? punchInfo[0]?.month?.notSeriesTimes : '-',
      unit: '天没喝奶茶',
    },
  ];

  const dayFormatter = (day: Calendar.DayObject) => {
    if (!day.value) {
      return day;
    }

    const date = day.value.getDate();

    initUseDate?.A?.map(item => {
      date === item &&
        (day.bottom = <text className="iconfont icon-jinghuaru"></text>);
    });

    initUseDate?.C?.map(item => {
      date === item &&
        (day.bottom = <text className="iconfont icon-ruye"></text>);
    });

    return day;
  };

  const handleTab = (key: number, info: { title: string }) => {
    const lastIndex = info.title?.lastIndexOf('.');
    const currentMonth = Number(info.title?.substring(lastIndex + 1));
    setValue(key);
    fetchUseData(currentMonth);
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
                  <text>{item.num?.toString() || '-'}</text>
                  <text>{item.unit}</text>
                </Flex.Item>
              );
            })}
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Image className="totalPic" src={fightPic} mode="widthFix" />
        </Flex.Item>
      </Flex>

      <Tabs className="weekendCalen" value={value} onChange={handleTab}>
        <Tabs.TabPane title={dayjs().add(-1, 'M').format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().add(-1, 'M').toDate()}
            max={dayjs().add(-1, 'M').toDate()}
            formatter={dayFormatter}
          />
        </Tabs.TabPane>
        <Tabs.TabPane title={dayjs().format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().toDate()}
            max={dayjs().toDate()}
            formatter={dayFormatter}
          />
        </Tabs.TabPane>
        <Tabs.TabPane title={dayjs().add(1, 'M').format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().add(1, 'M').toDate()}
            max={dayjs().add(1, 'M').toDate()}
            formatter={dayFormatter}
          />
        </Tabs.TabPane>
      </Tabs>
    </view>
  );
};

export default inject('store')(observer(MonthDetail));
