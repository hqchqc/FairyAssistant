import { observable, action } from 'mobx';

export type punchInfo = {
  month?: {
    notSeriesTimes: number;
    seriesTimes: number;
    times: number;
  };
  week?: {
    times: number;
  };
  year?: {
    times: number;
    useTimes: number;
  };
  totalTimes?: number;
};

class Store {
  @observable tabbarIndex = 'Home';
  @observable punchInfo: punchInfo[] = [];

  @action.bound
  selectedTab(tabbar: string) {
    this.tabbarIndex = tabbar;
  }

  @action.bound
  savePunchInfo(punchInfo: punchInfo[]) {
    this.punchInfo = punchInfo;
  }
}

export default new Store();
