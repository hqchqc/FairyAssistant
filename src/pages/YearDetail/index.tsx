import { Flex } from '@taroify/core';
import { Image } from '@tarojs/components';
import fightPic from '@assets/Illustration/fight_boy.svg';
import { observer, inject } from 'mobx-react';
import './index.less';
import { punchInfo } from 'src/store';

interface YearDetailProps {
  store: {
    Store: {
      punchInfo: punchInfo[];
    };
  };
}

const YearDetail: React.FC<YearDetailProps> = props => {
  const {
    store: {
      Store: { punchInfo },
    },
  } = props;

  const totalNums = [
    {
      id: 'year',
      text: '今年累计喝掉',
      num: punchInfo[0]?.year?.useTimes,
      unit: '杯',
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
    </view>
  );
};

export default inject('store')(observer(YearDetail));
