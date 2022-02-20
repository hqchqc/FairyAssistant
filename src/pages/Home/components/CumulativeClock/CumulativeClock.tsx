import { Flex } from '@taroify/core';
import './CumulativeClock.less';

interface CumulativeClockProps {
  totalTimes?: number;
}

const CumulativeClock: React.FC<CumulativeClockProps> = props => {
  const { totalTimes } = props;
  return (
    <Flex className="totalClock">
      <Flex.Item>
        <text>您累计打卡</text>
        <text>{totalTimes?.toString() || '-'}</text>
        <text>次</text>
      </Flex.Item>
    </Flex>
  );
};

export default CumulativeClock;
