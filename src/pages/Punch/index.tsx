import { Button, Form, Radio } from '@taroify/core';
import { BaseEventOrig } from '@tarojs/components/types/common';
import { FormProps } from '@tarojs/components/types/Form';
import './index.less';
import { View } from '@tarojs/components';

interface PunchProps {}

const Punch: React.FC<PunchProps> = () => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    console.log(JSON.stringify(event.detail.value));
  };
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        type: 'A',
      }}
    >
      <Form.Item name="type">
        <Form.Label>种类</Form.Label>
        <Form.Control>
          <Radio.Group direction="horizontal">
            <Radio name="A">A</Radio>
            <Radio name="C">C</Radio>
          </Radio.Group>
        </Form.Control>
      </Form.Item>

      <View style={{ margin: '16px' }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  );
};

export default Punch;
