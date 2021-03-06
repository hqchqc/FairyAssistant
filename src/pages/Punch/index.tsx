import { Button, Form, Radio } from '@taroify/core';
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
      handleIsClockIn: (isClockIn: boolean) => void;
    };
  };
}

const Punch: React.FC<PunchProps> = props => {
  const selectedTab = props?.store?.Store.selectedTab;
  const handleIsClockIn = props.store.Store.handleIsClockIn;

  const handleSubmit = useCallback((type: string) => {
    Taro.cloud.callFunction({
      name: 'daily_request',
      data: {
        function_name: 'clockIn',
        type,
      },
      success: (res: TaroGeneral.IAnyObject) => {
        if (res.result.state === 'SUCCESS') {
          Taro.showToast({
            title: '打卡成功！',
            icon: 'success',
            duration: 1000,
            success: () => {
              setTimeout(() => {
                Taro.switchTab({
                  url: `/pages/Home/index`,
                });
                selectedTab('Home');
                handleIsClockIn(true);
              }, 1000);
            },
          });
        } else {
          Taro.showToast({
            title: res.result.message || '打卡失败~',
            icon: 'error',
            duration: 2000,
          });
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
    </>
  );
};

export default inject('store')(observer(Punch));
