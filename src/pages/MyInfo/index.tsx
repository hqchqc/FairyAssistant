import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import avatarFrameImg from '@assets/img/avatarFrame.svg';
import avatarImg from '@assets/img/avatar.svg';
import { Button } from '@taroify/core';
import { observer, inject } from 'mobx-react';
import './index.less';

interface MyInfoProps {
  store: {
    Store: {
      isLogin: boolean;
      handleIsLogin: (isLogin: boolean) => void;
    };
  };
}

type userInfo = {
  avatarUrl: string;
  nickName: string;
};

const MyInfo: React.FC<MyInfoProps> = props => {
  const isLogin = props?.store?.Store.isLogin;
  const handleIsLogin = props?.store?.Store.handleIsLogin;

  const [userInfo, setUserInfo] = useState<userInfo>({
    avatarUrl: '',
    nickName: '',
  });

  useEffect(() => {
    const userInfo = Taro.getStorageSync('userInfo');
    if (userInfo) {
      setUserInfo(userInfo);
      handleIsLogin(true);
    } else {
      handleIsLogin(false);
    }
  }, []);

  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于登录小程序',
      success: res => {
        Taro.showToast({
          title: '登录成功！',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              Taro.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              });
              setUserInfo(res.userInfo);
              handleIsLogin(true);
            }, 2000);
          },
        });
      },
      fail: () =>
        Taro.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 2000,
        }),
    });
  };

  const handleLogOut = () => {
    Taro.removeStorage({
      key: 'userInfo',
      success: () => {
        handleIsLogin(false);
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
    </>
  );
};

export default inject('store')(observer(MyInfo));
