import { Calendar, Flex, Tabs } from '@taroify/core';
import { Image } from '@tarojs/components';
import fightPic from '@assets/Illustration/fight.svg';
import './index.less';
import dayjs from 'dayjs';

interface WeekDetailProps {}

const WeekDetail: React.FC<WeekDetailProps> = () => {
  const totalNums = [
    {
      id: 'year',
      text: '本月累计喝掉',
      num: 1,
      unit: '杯',
    },
    {
      id: 'month',
      text: '本月坚持连续打卡',
      num: 11,
      unit: '天',
    },
    {
      id: 'week',
      text: '本月最长连续',
      num: 19,
      unit: '天没喝奶茶',
    },
  ];

  return (
    <view style={{ letterSpacing: 'normal' }}>
      <Flex justify="space-between" align="center" className="weekendCrad">
        <Flex.Item>
          <Flex direction="column" justify="center" className="textItem">
            {totalNums.map(item => {
              return (
                <Flex.Item className="totalText" key={item.id}>
                  <text>{item.text}</text>
                  <text>{item.num}</text>
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

      <Tabs animated swipeable>
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

export default WeekDetail;
