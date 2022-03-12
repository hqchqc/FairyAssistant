import { observable, action } from 'mobx';

export type detailTimes = {
  weekTimes: number;
  yearTimes: number;
  monthTimes: number;
};
class Store {
  @observable tabbarIndex = 'Home';
  @observable totalTimes = 0;
  @observable punchInfo: detailTimes = {
    weekTimes: 0,
    yearTimes: 0,
    monthTimes: 0,
  };

  @action.bound
  selectedTab(tabbar: string) {
    this.tabbarIndex = tabbar;
  }

  @action.bound
  saveTotalTimes(totalTimes: string) {
    this.totalTimes = Number(totalTimes);
  }

  @action.bound
  savePunchInfo(punchInfo: detailTimes) {
    this.punchInfo = punchInfo;
  }
}

export default new Store();
