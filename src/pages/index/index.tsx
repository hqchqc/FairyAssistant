import { Flex } from '@taroify/core';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <Flex align="center" direction="column">
      <Flex>
        <Flex.Item>您 累 计 喝 掉 8 杯</Flex.Item>
      </Flex>

      <Flex
        gutter={20}
        align="center"
        justify="space-between"
        style={{
          width: '85%',
          padding: '20px 10px',
          textAlign: 'center',
          margin: '15px',
          // boxShadow: '10px 10px 5px #fff',
          borderRadius: '10px',
          border: '1px solid #ccc',
        }}
      >
        <Flex.Item span={6}>今年已喝 1 杯</Flex.Item>
        <Flex.Item span={6} className="monthUse">
          本月已喝 1 杯
        </Flex.Item>
        <Flex.Item span={6}>本周已喝 1 杯</Flex.Item>
      </Flex>
    </Flex>
  );
};

export default Index;
