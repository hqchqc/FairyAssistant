import { Image, Toast } from '@taroify/core';
import avatarFrameImg from '@assets/img/avatarFrame.svg';
import avatarImg from '@assets/img/avatar.svg';

import './index.less';
import Taro from '@tarojs/taro';
import { useState } from 'react';

interface MyInfoProps {}

const MyInfo: React.FC<MyInfoProps> = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickName, setNickName] = useState('');

  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于登录小程序',
      success: userInfo => {
        const { avatarUrl, nickName } = userInfo.userInfo;
        setNickName(nickName);
        setAvatarUrl(avatarUrl);
        Toast.success('登录成功！');
      },
      fail: () => {
        Toast.fail('登录失败！请授权~');
      },
    });
  };

  return (
    <>
      <view className="myInfoBg">
        <view className="myInfoBox">
          <Image src={avatarFrameImg} className="avatarFrame" />
          <Image
            src={avatarUrl || avatarImg}
            shape="circle"
            className="avatar"
          />
          <text className="loginText" onClick={() => handleLogin()}>
            {nickName || '点击登录'}
          </text>
        </view>
      </view>
      <Toast id="toast" />
    </>
  );
};

export default MyInfo;
