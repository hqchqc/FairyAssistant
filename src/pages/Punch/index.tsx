import { Button, Form, Radio, Toast } from '@taroify/core';
import { BaseEventOrig } from '@tarojs/components/types/common';
import { FormProps } from '@tarojs/components/types/Form';
import './index.less';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

interface PunchProps {}

const Punch: React.FC<PunchProps> = () => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const type = event.detail.value?.type;
    Taro.cloud.callFunction({
      name: 'createPunch',
      data: {
        type,
      },
      success: (res: TaroGeneral.IAnyObject) => {
        console.log(res, 11);
      },
      fail: err => Toast.fail(err.errMsg),
    });
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
