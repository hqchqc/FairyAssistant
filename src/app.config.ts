export default {
  pages: [
    'pages/Home/index',
    'pages/MonthDetail/index',
    'pages/YearDetail/index',
    'pages/WeekDetail/index',
    'pages/MyInfo/index',
    'pages/Punch/index',
  ],
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '首页',
      },
      {
        pagePath: 'pages/MyInfo/index',
        text: '打卡',
      },
    ],
  },
  usingComponents: {},
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
