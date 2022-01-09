import { Flex, Image } from '@taroify/core';
import { Swiper, SwiperItem } from '@tarojs/components';
import { useEffect, useState } from 'react';
import pic_one from '@assets/Illustration/01.svg';
import pic_two from '@assets/Illustration/02.svg';
import pic_three from '@assets/Illustration/03.svg';
import pic_four from '@assets/Illustration/04.svg';
import './Medal.less';

interface MedalProps {}

const Medal: React.FC<MedalProps> = () => {
  const [previousMargin, setPreviousMargin] = useState(0);
  const [nextMargin, setNextMargin] = useState(0);
  const [cardCur, setCardCur] = useState(0);

  const posterList = [
    {
      imageA: pic_one,
      id: 1,
    },
    {
      imageA: pic_two,
      id: 2,
    },
    {
      imageA: pic_three,
      id: 3,
    },
    {
      imageA: pic_four,
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
