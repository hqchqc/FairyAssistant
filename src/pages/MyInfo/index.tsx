import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log(11);
    try {
      const value = Taro.getStorageSync('userInfo');
      if (value) {
        setNickName(value.nickName);
        setAvatarUrl(value.avatarUrl);
        setIsHandleLogin(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  const handleLogin = () => {
    Taro.getUserProfile({
      desc: '用于登录小程序',
      success: async userInfo => {
        Taro.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(res.code);
            } else {
              console.log('登录失败！' + res.errMsg);
            }
          },
        });
        const { avatarUrl, nickName } = userInfo.userInfo;

        setIsHandleLogin(false);
        Taro.setStorage({
          key: 'userInfo',
          data: {
            nickName,
            avatarUrl,
          },
        });
        const punchInfo = (await Taro.cloud.callFunction({
          name: 'punchInfo',
        })) as punchResult;

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
    Taro.removeStorage({
      key: 'userInfo',
      success: res => {
        setIsHandleLogin(true);
        setNickName('');
        setAvatarUrl('');
        savePunchInfo([]);
      },
    });
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
