import { Flex } from '@taroify/core';
import { inject, observer } from 'mobx-react';
import './CumulativeClock.less';

interface CumulativeClockProps {
  store?: {
    Store: { totalTimes: number };
  };
}

const CumulativeClock: React.FC<CumulativeClockProps> = props => {
  const totalTimes = props?.store?.Store.totalTimes;

  return (
    <Flex className="totalClock">
      <Flex.Item>
        <text>您累计打卡</text>
        <text>{totalTimes || '-'}</text>
        <text>次</text>
      </Flex.Item>
    </Flex>
  );
};

export default inject('store')(observer(CumulativeClock));
