import { Calendar } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <View className="index">
      <Calendar />
    </View>
  );
};

export default Index;
