import { Cell, Form } from '@taroify/core';
import { BaseEventOrig, Input } from '@tarojs/components';
import { FormProps } from '@tarojs/components/types/Form';
import './index.less';

interface PunchProps {}

const Punch: React.FC<PunchProps> = () => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    console.log(JSON.stringify(event.detail.value));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Cell.Group inset>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请填写用户名' }]}
        >
          <Form.Label>用户名</Form.Label>
          <Form.Control>
            <Input placeholder="用户名" />
          </Form.Control>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请填写密码' }]}
        >
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input password placeholder="密码" />
          </Form.Control>
        </Form.Item>
      </Cell.Group>
    </Form>
  );
};

export default Punch;
