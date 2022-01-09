import { Flex } from '@taroify/core';
import './CumulativeClock.less';

interface CumulativeClockProps {}

const CumulativeClock: React.FC<CumulativeClockProps> = () => {
  return (
    <Flex className="totalClock">
      <Flex.Item>
        <text>您累计打卡</text>
        <text>8</text>
        <text>次</text>
      </Flex.Item>
    </Flex>
  );
};

export default CumulativeClock;
