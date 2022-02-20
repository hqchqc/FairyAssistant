import { Calendar, Flex, Tabs } from '@taroify/core';
import { Image } from '@tarojs/components';
import fightPic from '@assets/Illustration/fight.svg';
import { punchInfo } from 'src/store';
import { observer, inject } from 'mobx-react';
import dayjs from 'dayjs';
import './index.less';

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

  const totalNums = [
    {
      id: 'year',
      text: '本月累计喝掉',
      num: punchInfo[0]?.month?.times,
      unit: '杯',
    },
    {
      id: 'month',
      text: '本月坚持连续打卡',
      num: punchInfo[0]?.month?.seriesTimes,
      unit: '天',
    },
    {
      id: 'week',
      text: '本月最长连续',
      num: punchInfo[0]?.month?.notSeriesTimes,
      unit: '天没喝奶茶',
    },
  ];

  return (
    <view style={{ letterSpacing: 'normal' }}>
      <Flex justify="space-between" align="center" className="weekendCrad">
        <Flex.Item>
          <Flex direction="column" justify="center" className="textItem">
            {totalNums.map(item => {
              console.log(item);
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

      <Tabs className="weekendCalen" animated swipeable>
        <Tabs.TabPane title={dayjs().add(-1, 'M').format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().add(-1, 'M').toDate()}
            max={dayjs().add(-1, 'M').toDate()}
          />
        </Tabs.TabPane>
        <Tabs.TabPane title={dayjs().format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().toDate()}
            max={dayjs().toDate()}
          />
        </Tabs.TabPane>
        <Tabs.TabPane title={dayjs().add(1, 'M').format('YYYY.MM')}>
          <Calendar
            title={false}
            min={dayjs().add(1, 'M').toDate()}
            max={dayjs().add(1, 'M').toDate()}
          />
        </Tabs.TabPane>
      </Tabs>
    </view>
  );
};

export default inject('store')(observer(MonthDetail));
