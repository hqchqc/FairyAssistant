import { Flex } from '@taroify/core';
import { Image } from '@tarojs/components';
import fightPic from '@assets/Illustration/fight_boy.svg';
import './index.less';

interface YearDetailProps {}

const YearDetail: React.FC<YearDetailProps> = () => {
  const totalNums = [
    {
      id: 'year',
      text: '今年累计喝掉',
      num: 100,
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
    </view>
  );
};

export default YearDetail;
