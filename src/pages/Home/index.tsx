import { Toast } from '@taroify/core';
import CatchPhrase from './components/CatchPhrase/CatchPhrase';
import CumulativeClock from './components/CumulativeClock/CumulativeClock';
import Medal from './components/Medal/Medal';
import StatisticalWeek from './components/StatisticalWeek/StatisticalWeek';
import StatisticsMost from './components/StatisticsMost/StatisticsMost';
import { observer, inject } from 'mobx-react';
import './index.less';
import { useCallback, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { detailTimes } from 'src/store';
import Flex from '@taroify/core/flex/flex';

interface IndexProps {
  store: {
    Store: {
      savePunchInfo: (punchInfo: detailTimes) => void;
      saveTotalTimes: (totalTimes: string) => void;
      isLogin: boolean;
      selectedTab: (tabbar: string) => void;
      isClockIn: boolean;
    };
  };
}

const Index: React.FC<IndexProps> = props => {
  const {
    store: {
      Store: { savePunchInfo, saveTotalTimes, isLogin, selectedTab, isClockIn },
    },
  } = props;

  const fetchRecordTotal = useCallback(() => {
    Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'recordTotal',
      },
      success: res => res?.result && saveTotalTimes(res?.result as string),
    });
  }, []);

  const fetchDetailTimes = useCallback(() => {
    Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'detailTimes',
      },
      success: res => res?.result && savePunchInfo(res.result as detailTimes),
    });
  }, []);

  const handleIsLogin = useCallback(() => {
    const userInfo = Taro.getStorageSync('userInfo');
    if (userInfo) {
      fetchRecordTotal();
      fetchDetailTimes();
    } else {
      Toast.fail('请先登录~');
      Taro.switchTab({
        url: `/pages/MyInfo/index`,
      });
      selectedTab('MyInfo');
    }
  }, []);

  useEffect(() => {
    handleIsLogin();
  }, [isLogin, isClockIn]);

  return (
    <view>
      <Flex align="center" direction="column">
        {/* 第一部分 累计打卡 */}
        <CumulativeClock />

        {/* 第二部分 年 月 周 统计 */}
        <StatisticalWeek />

        {/* 第三部分 打卡最多 评分最高 累计花费 */}
        <StatisticsMost />

        {/* 第四部分 勋章 */}
        <Medal />

        {/* 第五部分 名言警句 */}
        <CatchPhrase />

        <Toast id="toast" />
      </Flex>
    </view>
  );
};

export default inject('store')(observer(Index));
