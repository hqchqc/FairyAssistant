import { Flex } from '@taroify/core';
import { Image } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import './index.less';
import { detailTimes } from 'src/store';

interface YearDetailProps {
  store: {
    Store: {
      punchInfo: detailTimes;
    };
  };
}

const YearDetail: React.FC<YearDetailProps> = props => {
  const {
    store: {
      Store: { punchInfo },
    },
  } = props;

  const IMGSRC =
    'https://wx3.sinaimg.cn/mw2000/006TdVgDgy1h088ng4jv1j30dw0dwaas.jpg';

  const totalNums = [
    {
      id: 'year',
      text: '今年累计打卡',
      num: punchInfo.yearTimes,
      unit: '次',
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
                  <text>{item.num || '-'}</text>
                  <text>{item.unit}</text>
                </Flex.Item>
              );
            })}
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Image className="totalPic" src={IMGSRC} mode="widthFix" />
        </Flex.Item>
      </Flex>
    </view>
  );
};

export default inject('store')(observer(YearDetail));
