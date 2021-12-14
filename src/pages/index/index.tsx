import { Calendar } from '@taroify/core';
import { View } from '@tarojs/components';
import { useState } from 'react';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const [minDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
  );
  const [maxDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0)
  );

  const handleFormatter = (day: Calendar.DayObject) => {
    const month = day.value.getMonth() + 1;
    const date = day.value.getDate();

    if (month === 11) {
      if (date === 1) {
        day.bottom = 'C';
      } else if (date === 14) {
        day.children = day.children = (
          <text className="iconfont">&#xe606;</text>
        );
      } else if (date === 5) {
        day.children = <text className="iconfont">&#xe608;</text>;
      }
    }

    if (day.type === 'start') {
      day.bottom = '入店';
    } else if (day.type === 'end') {
      day.bottom = '离店';
    } else if (day.type === 'active') {
      day.bottom = '入店/离店';
    }

    return day;
  };

  return (
    <View className="index">
      <Calendar
        readonly
        min={minDate}
        max={maxDate}
        formatter={handleFormatter}
      />
    </View>
  );
};

export default Index;
