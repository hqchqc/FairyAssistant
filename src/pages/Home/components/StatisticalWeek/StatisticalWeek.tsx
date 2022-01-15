import { Flex } from '@taroify/core';
import Taro from '@tarojs/taro';
import './StatisticalWeek.less';

interface StatisticalWeekProps {}

const StatisticalWeek: React.FC<StatisticalWeekProps> = () => {
  const totalNum = [
    {
      id: 'year',
      text: '今年已打',
      num: 1,
      unit: '次',
    },
    {
      id: 'month',
      text: '本月已打',
      num: 1,
      unit: '次',
    },
    {
      id: 'week',
      text: '本周已打',
      num: 1,
      unit: '次',
    },
  ];

  const NAVIGATEPATH = '/pages/WeekDetail/index';

  return (
    <Flex
      className="totalNum"
      gutter={20}
      align="center"
      justify="space-between"
    >
      {totalNum.map((item, index) => {
        return (
          <Flex.Item
            className="totalDetail"
            span={8}
            key={item.id}
            onClick={e => {
              index === 1 &&
                Taro.navigateTo({
                  url: NAVIGATEPATH,
                });
            }}
          >
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
