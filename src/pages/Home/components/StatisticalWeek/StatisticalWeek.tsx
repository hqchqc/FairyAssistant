import { Flex } from '@taroify/core';
import './StatisticalWeek.less';

interface StatisticalWeekProps {}

const StatisticalWeek: React.FC<StatisticalWeekProps> = () => {
  const totalNum = [
    {
      id: 'year',
      text: '今年已喝',
      num: 1,
      unit: '杯',
    },
    {
      id: 'month',
      text: '本月已喝',
      num: 1,
      unit: '杯',
    },
    {
      id: 'week',
      text: '本周已喝',
      num: 1,
      unit: '杯',
    },
  ];

  return (
    <Flex
      className="totalNum"
      gutter={20}
      align="center"
      justify="space-between"
    >
      {totalNum.map(item => {
        return (
          <Flex.Item className="totalDetail" span={8} key={item.id}>
            <text>{item.text}</text>
            <text>{item.num}</text>
            <text>{item.unit}</text>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

export default StatisticalWeek;
