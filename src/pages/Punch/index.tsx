import { Button, Form, Radio, Toast } from '@taroify/core';
import { BaseEventOrig } from '@tarojs/components/types/common';
import { FormProps } from '@tarojs/components/types/Form';
import './index.less';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useCallback } from 'react';
import { inject, observer } from 'mobx-react';

interface PunchProps {
  store: {
    Store: {
      selectedTab: (tabbar: string) => void;
    };
  };
}

const Punch: React.FC<PunchProps> = props => {
  const selectedTab = props?.store?.Store.selectedTab;

  const handleSubmit = useCallback((type: string) => {
    Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'clockIn',
        type,
      },
      success: (res: TaroGeneral.IAnyObject) => {
        if (res.result.state === 'SUCCESS') {
          Toast.success('打卡成功！');
          Taro.switchTab({
            url: `/pages/Home/index`,
          });
          selectedTab('Home');
        } else {
          Toast.fail(res.result.message || '打卡失败~');
        }
      },
    });
  }, []);

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const type = event.detail.value?.type;
    handleSubmit(type);
  };

  return (
    <>
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

      <Toast id="toast" />
    </>
  );
};

export default inject('store')(observer(Punch));
