import { observable, action } from 'mobx';

class Store {
  @observable tabbarIndex = 'Home';

  @action.bound
  selectedTab(tabbar: string) {
    this.tabbarIndex = tabbar;
  }
}

export default new Store();
