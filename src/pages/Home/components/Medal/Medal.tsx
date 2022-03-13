import { Flex, Image } from '@taroify/core';
import { Swiper, SwiperItem } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './Medal.less';

interface MedalProps {}

const Medal: React.FC<MedalProps> = () => {
  const [previousMargin, setPreviousMargin] = useState(0);
  const [nextMargin, setNextMargin] = useState(0);
  const [cardCur, setCardCur] = useState(0);

  const posterList = [
    {
      imageA:
        'https://wx4.sinaimg.cn/mw2000/006TdVgDgy1h088nf4z9oj30e80e840f.jpg',
      id: 1,
    },
    {
      imageA:
        'https://wx4.sinaimg.cn/mw2000/006TdVgDgy1h088nfbsztj30e80e8myv.jpg',
      id: 2,
    },
    {
      imageA:
        'https://wx3.sinaimg.cn/mw2000/006TdVgDgy1h088nfl8myj30e80e8dhq.jpg',
      id: 3,
    },
    {
      imageA:
        'https://wx2.sinaimg.cn/mw2000/006TdVgDgy1h088nfs57tj30e80e8jts.jpg',
      id: 4,
    },
  ];

  useEffect(() => {
    setPreviousMargin(90);
    setNextMargin(90);
  }, posterList);

  const handleSwiper = e => {
    setCardCur(e.detail.current);
  };

  return (
    <Flex className="swiper" direction="column" align="center">
      <view className="poster">
        <Swiper
          className="card-swiper"
          circular
          duration={1000}
          skipHiddenItemLayout
          previousMargin={previousMargin + 'rpx'}
          nextMargin={nextMargin + 'rpx'}
          indicatorDots={false}
          onChange={handleSwiper}
        >
          {posterList?.map((item, index) => {
            return (
              <SwiperItem className="swiper-item">
                <view
                  className={cardCur === index ? 'item swiperactive' : 'item'}
                >
                  <text>双倍快乐</text>
                  <Image className="banner" src={item.imageA} mode="widthFix" />
                </view>
              </SwiperItem>
            );
          })}
        </Swiper>
      </view>
    </Flex>
  );
};

export default Medal;
