import { Flex, Image } from '@taroify/core';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import pic_one from '../../../src/assets/Illustration/01.svg';
import pic_two from '../../../src/assets/Illustration/02.svg';
import pic_three from '../../../src/assets/Illustration/03.svg';
import pic_four from '../../../src/assets/Illustration/04.svg';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
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

  const totalNum = [
    {
      id: 'year',
      text: '今年已喝',
      num: 1,
      unit: '杯',
    },
    {
      id: 'month',
      text: '本月已喝',
      num: 1,
      unit: '杯',
    },
    {
      id: 'week',
      text: '本周已喝',
      num: 1,
      unit: '杯',
    },
  ];

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

  const handleSwiper = e => {
    setCardCur(e.detail.current);
  };

  return (
    <view className="background">
      <Flex align="center" direction="column">
        {/* 第一部分 累计打卡 */}
        <Flex>
          <Flex.Item>您累计喝掉8杯</Flex.Item>
        </Flex>

        {/* 第二部分 年 月 周 统计 */}
        <Flex
          className="totalNum"
          gutter={20}
          align="center"
          justify="space-between"
        >
          {totalNum.map(item => {
            return (
              <Flex.Item className="totalDetail" span={8} key={item.id}>
                <text>{item.text}</text>
                <text>{item.num}</text>
                <text>{item.unit}</text>
              </Flex.Item>
            );
          })}
        </Flex>

        {/* 第三部分 打卡最多 评分最高 累计花费 */}
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

        {/* 第四部分 勋章 */}
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
                      className={
                        cardCur === index ? 'item swiperactive' : 'item'
                      }
                    >
                      <text>双倍快乐</text>
                      <Image
                        className="banner"
                        src={item.imageA}
                        mode="widthFix"
                      />
                    </view>
                  </SwiperItem>
                );
              })}
            </Swiper>
          </view>
        </Flex>

        {/* 第五部分 名言警句 */}
        <Flex direction="column" align="center" className="quotesPart">
          <Flex.Item>😀😘😜</Flex.Item>
          <Flex.Item className="quotes">努力一分钟，老公会不同。</Flex.Item>
        </Flex>
      </Flex>
    </view>
  );
};

export default Index;
