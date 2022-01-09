import { Flex } from '@taroify/core';
import CatchPhrase from './components/CatchPhrase/CatchPhrase';
import CumulativeClock from './components/CumulativeClock/CumulativeClock';
import Medal from './components/Medal/Medal';
import StatisticalWeek from './components/StatisticalWeek/StatisticalWeek';
import StatisticsMost from './components/StatisticsMost/StatisticsMost';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <view className="background">
      <Flex align="center" direction="column">
        {/* 第一部分 累计打卡 */}
        <CumulativeClock />

        {/* 第二部分 年 月 周 统计 */}
        <StatisticalWeek />

        {/* 第三部分 打卡最多 评分最高 累计花费 */}
        <StatisticsMost />

        {/* 第四部分 勋章 */}
        <Medal />

        {/* 第五部分 名言警句 */}
        <CatchPhrase />
      </Flex>
    </view>
  );
};

export default Index;
