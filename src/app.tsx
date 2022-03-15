import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Provider } from 'mobx-react';
import Store from './store';

import './app.less';

/**
 * mobx 的引入
 */
const store = {
  Store,
};
class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'cloud-dev-2gauh3bdfcaf8597', // 云开发环境ID
      });
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
