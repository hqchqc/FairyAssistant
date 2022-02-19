import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { useState } from 'react';
import avatarFrameImg from '@assets/img/avatarFrame.svg';
import avatarImg from '@assets/img/avatar.svg';
import { Button, Toast } from '@taroify/core';
import './index.less';

interface MyInfoProps {}

const MyInfo: React.FC<MyInfoProps> = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickName, setNickName] = useState('');
  const [isHandleLogin, setIsHandleLogin] = useState(true);

  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于登录小程序',
      success: userInfo => {
        const { avatarUrl, nickName } = userInfo.userInfo;
        setNickName(nickName);
        setAvatarUrl(avatarUrl);
        setIsHandleLogin(false);
        Taro.cloud.callFunction({
          name: 'punchInfo',
        });
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
      </view>

      <Button color="primary" block onClick={() => handleLogOut()}>
        退出登录
      </Button>
      <Toast id="toast" />
    </>
  );
};

export default MyInfo;
