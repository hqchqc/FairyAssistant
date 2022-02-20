import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { useState } from 'react';
import avatarFrameImg from '@assets/img/avatarFrame.svg';
import avatarImg from '@assets/img/avatar.svg';
import { Button, Toast } from '@taroify/core';
import { observer, inject } from 'mobx-react';
import { punchInfo } from '../../store/index';
import './index.less';

interface MyInfoProps {
  store: {
    Store: {
      savePunchInfo: (punchInfo: punchInfo[]) => void;
    };
  };
}

type punchResult = {
  result?: {
    data?: punchInfo[];
  };
};

const MyInfo: React.FC<MyInfoProps> = props => {
  const {
    store: {
      Store: { savePunchInfo },
    },
  } = props;
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickName, setNickName] = useState('');
  const [isHandleLogin, setIsHandleLogin] = useState(true);

  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于登录小程序',
      success: async userInfo => {
        const { avatarUrl, nickName } = userInfo.userInfo;
        setNickName(nickName);
        setAvatarUrl(avatarUrl);
        setIsHandleLogin(false);
        const punchInfo = (await Taro.cloud.callFunction({
          name: 'punchInfo',
        })) as punchResult;

        console.log(punchInfo);

        if (punchInfo?.result?.data && punchInfo?.result?.data?.length !== 0) {
          savePunchInfo(punchInfo?.result?.data);
        }
        Toast.success('登录成功！');
      },
      fail: () => {
        setIsHandleLogin(true);
        Toast.fail('登录失败！请授权~');
      },
    });
  };

  const handleLogOut = () => {
    setIsHandleLogin(true);
    setNickName('');
    setAvatarUrl('');
    savePunchInfo([]);
  };

  return (
    <>
      <view className="myInfoBg">
        <view className="myInfoBox">
          <Image src={avatarFrameImg} className="avatarFrame" />
          <Image src={avatarUrl || avatarImg} className="avatar" />
          <text
            className="loginText"
            onClick={() => isHandleLogin && handleLogin()}
          >
            {nickName || '点击登录'}
          </text>
        </view>
        {!isHandleLogin && (
          <Button block onClick={() => handleLogOut()} className="myInfoLogOut">
            退出登录
          </Button>
        )}
      </view>

      <Toast id="toast" />
    </>
  );
};

export default inject('store')(observer(MyInfo));
