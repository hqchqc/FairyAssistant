import { Tabbar } from '@taroify/core';
import { HomeOutlined, SettingOutlined } from '@taroify/icons';
import Taro from '@tarojs/taro';
import './index.less';

interface BasicTabbarProps {}

const BasicTabbar: React.FC<BasicTabbarProps> = () => {
  const onChange = (tabbar: string) => {
    console.log(tabbar, 111);
    Taro.switchTab({
      url: `/pages/${tabbar}/index`,
    });
  };
  return (
    <Tabbar defaultValue="Home" fixed bordered onChange={onChange}>
      <Tabbar.TabItem value={'Home'} icon={<HomeOutlined />}>
        首页
      </Tabbar.TabItem>
      <Tabbar.TabItem value={'Punch'} icon={<SettingOutlined />}>
        我的
      </Tabbar.TabItem>
    </Tabbar>
  );
};

export default BasicTabbar;
