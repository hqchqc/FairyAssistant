import { Flex, Button } from '@taroify/core';
import { Image } from '@tarojs/components';
import weepPic from '@assets/Illustration/weep.svg';
import CatchPhrase from '../Home/components/CatchPhrase/CatchPhrase';
import dayjs from 'dayjs';
import Taro from '@tarojs/taro';
import './index.less';

interface WeekDetailProps {}

const WeekDetail: React.FC<WeekDetailProps> = () => {
  const PATH = '/pages/Punch/index';

  return (
    <view>
      <Flex direction="column" align="center" className="weekendCrad">
        <Flex.Item>
          <Image className="totalPic" src={weepPic} mode="heightFix" />
        </Flex.Item>
        <Flex.Item>
          <text>嘿，猪猪女孩，今天还没打卡呦~</text>
        </Flex.Item>
      </Flex>

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

      <CatchPhrase />

      <Flex justify="center">
        <text className="formatDate">{dayjs().format('YYYY-MM-DD')}</text>
      </Flex>
    </view>
  );
};

export default WeekDetail;
