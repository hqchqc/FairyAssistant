import { Flex, Toast } from '@taroify/core';
import CatchPhrase from './components/CatchPhrase/CatchPhrase';
import CumulativeClock from './components/CumulativeClock/CumulativeClock';
import Medal from './components/Medal/Medal';
import StatisticalWeek from './components/StatisticalWeek/StatisticalWeek';
import StatisticsMost from './components/StatisticsMost/StatisticsMost';
import { observer, inject } from 'mobx-react';

import './index.less';
import { punchInfo } from 'src/store';
import { useEffect } from 'react';
import Taro from '@tarojs/taro';

interface IndexProps {
  store: {
    Store: {
      punchInfo: punchInfo[];
      tabbarIndex: string;
      savePunchInfo: (punchInfo: punchInfo[]) => void;
      selectedTab: (tabbar: string) => void;
    };
  };
}

type punchResult = {
  result?: {
    data?: punchInfo[];
  };
};

const Index: React.FC<IndexProps> = props => {
  const {
    store: {
      Store: { punchInfo, tabbarIndex, savePunchInfo, selectedTab },
    },
  } = props;

  useEffect(() => {
    Taro.checkSession({
      success: async () => {
        const punchInfo = (await Taro.cloud.callFunction({
          name: 'punchInfo',
        })) as punchResult;

        if (punchInfo?.result?.data && punchInfo?.result?.data?.length !== 0) {
          savePunchInfo(punchInfo?.result?.data);
        }
      },
      fail: function (err) {
        Toast.fail('请登录！');
        selectedTab('MyInfo');
        Taro.switchTab({ url: '/pages/MyInfo/index' });
      },
    });
  }, [tabbarIndex]);

  return (
    <view>
      <Flex align="center" direction="column">
        {/* 第一部分 累计打卡 */}
        <CumulativeClock totalTimes={punchInfo[0]?.totalTimes} />

        {/* 第二部分 年 月 周 统计 */}
        <StatisticalWeek punchInfo={punchInfo[0]} />

        {/* 第三部分 打卡最多 评分最高 累计花费 */}
        <StatisticsMost />

        {/* 第四部分 勋章 */}
        <Medal />

        {/* 第五部分 名言警句 */}
        <CatchPhrase />
      </Flex>
    </view>
  );
};

export default inject('store')(observer(Index));
