import { Tabbar } from '@taroify/core';
import { WapHomeOutlined, ManagerOutlined } from '@taroify/icons';
import Taro from '@tarojs/taro';
import './index.less';
import { observer, inject } from 'mobx-react';

interface BasicTabbarProps {
  store: {
    Store: { selectedTab: (tabbar: string) => void; tabbarIndex: string };
  };
}

const BasicTabbar: React.FC<BasicTabbarProps> = props => {
  const {
    store: {
      Store: { selectedTab, tabbarIndex },
    },
  } = props;

  const onChange = (tabbar: string) => {
    selectedTab(tabbar);
    Taro.switchTab({
      url: `/pages/${tabbar}/index`,
    });
  };

  return (
    <Tabbar value={tabbarIndex} onChange={onChange}>
      <Tabbar.TabItem value={'Home'} icon={<WapHomeOutlined />}>
        ้ฆ้กต
      </Tabbar.TabItem>
      <Tabbar.TabItem value={'MyInfo'} icon={<ManagerOutlined />}>
        ๆ็
      </Tabbar.TabItem>
    </Tabbar>
  );
};

export default inject('store')(observer(BasicTabbar));
