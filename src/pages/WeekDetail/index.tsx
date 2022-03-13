import { Flex, Button } from '@taroify/core';
import { Image } from '@tarojs/components';
import weepPic from '@assets/Illustration/weep.svg';
import punch from '@assets/Illustration/punch.svg';
import CatchPhrase from '../Home/components/CatchPhrase/CatchPhrase';
import dayjs from 'dayjs';
import Taro from '@tarojs/taro';
import './index.less';
import { useCallback, useEffect, useState } from 'react';

interface WeekDetailProps {}

const WeekDetail: React.FC<WeekDetailProps> = () => {
  const PATH = '/pages/Punch/index';

  const [isClockIn, setIsClockIn] = useState(false);

  const fetchIsClockIn = useCallback(() => {
    Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'isClockIn',
      },
      success: (res: TaroGeneral.IAnyObject) => setIsClockIn(res.result),
    });
  }, []);

  useEffect(() => {
    fetchIsClockIn();
  }, []);

  return (
    <view>
      <Flex direction="column" align="center" className="weekendCrad">
        <Flex.Item>
          <Image
            className="totalPic"
            src={isClockIn ? punch : weepPic}
            mode="heightFix"
          />
        </Flex.Item>
        <Flex.Item>
          {isClockIn ? (
            <text>今天已经打卡啦</text>
          ) : (
            <text>嘿，猪猪女孩，今天还没打卡呦~</text>
          )}
        </Flex.Item>
      </Flex>
      {!isClockIn && (
        <Flex justify="center">
          <Button
            variant="outlined"
            color="info"
            className={'clockInBtn'}
            onClick={() =>
              Taro.navigateTo({
                url: PATH,
              })
            }
          >
            马上打卡
          </Button>
        </Flex>
      )}

      <CatchPhrase />

      <Flex justify="center">
        <text className="formatDate">{dayjs().format('YYYY-MM-DD')}</text>
      </Flex>
    </view>
  );
};

export default WeekDetail;
