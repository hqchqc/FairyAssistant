import { Tabbar } from '@taroify/core';
import { HomeOutlined, SettingOutlined } from '@taroify/icons';
import Taro from '@tarojs/taro';
import { useEffect } from 'react';

interface BasicTabbarProps {}

const BasicTabbar: React.FC<BasicTabbarProps> = () => {
  useEffect(() => {
    Taro.switchTab({
      url: `/pages/Home/index`,
    });
  }, []);

  const onChange = (tabbar: string) => {
    Taro.switchTab({
      url: `/pages/${tabbar}/index`,
    });
  };
  return (
    <Tabbar defaultValue="Home" fixed onChange={onChange}>
      <Tabbar.TabItem value={'Home'} icon={<HomeOutlined />}>
        打卡
      </Tabbar.TabItem>
      <Tabbar.TabItem value={'Punch'} icon={<SettingOutlined />}>
        我的
      </Tabbar.TabItem>
    </Tabbar>
  );
};

export default BasicTabbar;
