import { Flex } from '@taroify/core';
import Taro from '@tarojs/taro';
import { punchInfo } from 'src/store';
import './StatisticalWeek.less';

interface StatisticalWeekProps {
  punchInfo: punchInfo;
}

const StatisticalWeek: React.FC<StatisticalWeekProps> = props => {
  const { punchInfo } = props;

  const totalNum = [
    {
      id: 'year',
      text: '今年已打',
      num: punchInfo?.year?.times,
      unit: '次',
    },
    {
      id: 'month',
      text: '本月已打',
      num: punchInfo?.month?.times,
      unit: '次',
    },
    {
      id: 'week',
      text: '本周已打',
      num: punchInfo?.week?.times,
      unit: '次',
    },
  ];

  const PATHMAP = {
    YEAR: '/pages/YearDetail/index',
    MONTH: '/pages/MonthDetail/index',
    WEEK: '/pages/WeekDetail/index',
  };

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
            onClick={() => {
              index === 0 &&
                Taro.navigateTo({
                  url: PATHMAP['YEAR'],
                });
              index === 1 &&
                Taro.navigateTo({
                  url: PATHMAP['MONTH'],
                });
              index === 2 &&
                Taro.navigateTo({
                  url: PATHMAP['WEEK'],
                });
            }}
          >
            <text>{item.text}</text>
            <text>{item.num?.toString() || '-'}</text>
            <text>{item.unit}</text>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

export default StatisticalWeek;
