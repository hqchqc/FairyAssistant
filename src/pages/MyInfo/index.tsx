import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import avatarFrameImg from '@assets/img/avatarFrame.svg';
import avatarImg from '@assets/img/avatar.svg';
import { Button, Toast } from '@taroify/core';
import { observer, inject } from 'mobx-react';
import './index.less';

interface MyInfoProps {}

type userInfo = {
  avatarUrl: string;
  nickName: string;
};

const MyInfo: React.FC<MyInfoProps> = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    avatarUrl: '',
    nickName: '',
  });
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userInfo = Taro.getStorageSync('userInfo');
    if (userInfo) {
      setUserInfo(userInfo);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于登录小程序',
      success: res => {
        Taro.setStorage({
          key: 'userInfo',
          data: res.userInfo,
        });
        setUserInfo(res.userInfo);
        setIsLogin(true);
        Toast.success('登录成功！');
      },
      fail: res => Toast.fail('登录失败！请授权~'),
    });
  };

  const handleLogOut = () => {
    Taro.removeStorage({
      key: 'userInfo',
      success: res => {
        setIsLogin(false);
        setUserInfo({
          avatarUrl: '',
          nickName: '',
        });
      },
    });
  };

  return (
    <>
      <view className="myInfoBg">
        <view className="myInfoBox">
          <Image src={avatarFrameImg} className="avatarFrame" />
          <Image src={userInfo.avatarUrl || avatarImg} className="avatar" />
          <text className="loginText" onClick={() => !isLogin && handleLogin()}>
            {userInfo.nickName || '点击登录'}
          </text>
        </view>
        {isLogin && (
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
