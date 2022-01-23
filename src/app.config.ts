export default {
  pages: [
    'pages/Home/index',
    'pages/YearDetail/index',
    'pages/MonthDetail/index',
    'pages/WeekDetail/index',
    'pages/Punch/index',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '首页',
      },
      {
        pagePath: 'pages/Punch/index',
        text: '打卡',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
