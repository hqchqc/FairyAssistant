import { Flex, Swiper, Image } from '@taroify/core';
import { View } from '@tarojs/components';
import pic_one from '../../../src/assets/Illustration/圣诞老人8.svg';
import pic_two from '../../../src/assets/Illustration/圣诞老人9.svg';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
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

  const handleSwiper = value => {
    console.log(value);
  };

  return (
    <Flex align="center" direction="column" style={{ letterSpacing: '8px' }}>
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
        <Swiper
          className="imageSwiper"
          loop={false}
          width={250}
          onChange={handleSwiper}
        >
          <Swiper.Item className="imageSwiperItem">
            <text>圣诞老人1</text>
            <Image src={pic_one} />
          </Swiper.Item>

          <Swiper.Item className="imageSwiperItem">
            <text>圣诞老人2</text>
            <Image
              style={{ width: '100px', height: '100px', display: 'block' }}
              src={pic_two}
            />
          </Swiper.Item>
        </Swiper>
      </Flex>

      {/* 第五部分 名言警句 */}
      <Flex direction="column" align="center" style={{ marginTop: '20px' }}>
        <Flex.Item>😀😘😜</Flex.Item>
        <Flex.Item
          style={{ fontSize: '14px', color: '#f9a7a5', letterSpacing: '3px' }}
        >
          努力一分钟，老公会不同。
        </Flex.Item>
      </Flex>
    </Flex>
  );
};

export default Index;
