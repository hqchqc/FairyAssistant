import { Flex, Button, Toast } from '@taroify/core';
import { Image } from '@tarojs/components';
import weepPic from '@assets/Illustration/weep.svg';
import punch from '@assets/Illustration/punch.svg';
import CatchPhrase from '../Home/components/CatchPhrase/CatchPhrase';
import dayjs from 'dayjs';
import Taro from '@tarojs/taro';
import './index.less';
import { useEffect, useState } from 'react';

interface WeekDetailProps {}

const WeekDetail: React.FC<WeekDetailProps> = () => {
  const [isPunch, setIsPunch] = useState(false);
  const PATH = '/pages/Punch/index';

  useEffect(() => {
    const month = dayjs().month() + 1;
    const day = dayjs().date();
    Taro.cloud.callFunction({
      name: 'punchCalc',
      data: {
        month,
        day,
      },
      success: (res: TaroGeneral.IAnyObject) => {
        if (res.result?.data) {
          setIsPunch(true);
        } else {
          setIsPunch(false);
        }
      },
      fail: err => Toast.fail(err.errMsg),
    });
  }, []);

  return (
    <view>
      <Flex direction="column" align="center" className="weekendCrad">
        <Flex.Item>
          <Image
            className="totalPic"
            src={isPunch ? punch : weepPic}
            mode="heightFix"
          />
        </Flex.Item>
        <Flex.Item>
          {isPunch ? (
            <text>今天已经打卡啦</text>
          ) : (
            <text>嘿，猪猪女孩，今天还没打卡呦~</text>
          )}
        </Flex.Item>
      </Flex>
      {!isPunch && (
        <Flex justify="center">
          <Button
            variant="outlined"
            color="info"
            style={{
              marginTop: '-10px',
              width: '150px',
              height: '40px',
              marginBottom: '50px',
            }}
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
