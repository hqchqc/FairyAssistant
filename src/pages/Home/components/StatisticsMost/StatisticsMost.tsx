import { Flex } from '@taroify/core';
import { View } from '@tarojs/components';
import './StatisticsMost.less';

interface StatisticsMostProps {}

const StatisticsMost: React.FC<StatisticsMostProps> = () => {
  const totalDetail = [
    {
      id: 'Maximum punch-in',
      text: '打卡最多',
      type: '阿嬷手作',
      icon: <View className="iconfont icon-gelishuang"></View>,
    },
    {
      id: 'Highest score',
      text: '评分最高',
      type: '奶茶',
      icon: <View className="iconfont icon-jinghuaru"></View>,
    },
    {
      id: 'Cumulative Expense',
      text: '累计花费',
      type: '1.0',
      icon: <View className="iconfont icon-fendiqidian"></View>,
    },
  ];

  return (
    <Flex
      className="totalItemNum"
      gutter={20}
      align="center"
      justify="space-between"
    >
      {totalDetail.map(item => {
        return (
          <Flex.Item className="totalItemDetail" span={8} key={item.id}>
            <text>{item.text}</text>
            {item.icon}
            <text>{item.type}</text>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

export default StatisticsMost;
