import { Image } from '@taroify/core';
import avatarFrameImg from '@assets/img/avatarFrame.svg';
import avatarImg from '@assets/img/avatar.svg';

import './index.less';
import Taro from '@tarojs/taro';

interface MyInfoProps {}

const MyInfo: React.FC<MyInfoProps> = () => {
  const handleLogin = () => {
    Taro.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: 'https://example.com/onLogin',
            data: {
              code: res.code,
            },
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      },
    });
  };

  return (
    <>
      <view className="myInfoBg">
        <view className="myInfoBox">
          <Image src={avatarFrameImg} className="avatarFrame" />
          <Image src={avatarImg} className="avatar" />
          <text className="loginText" onClick={() => handleLogin()}>
            点击登录
          </text>
        </view>
      </view>
    </>
  );
};

export default MyInfo;
