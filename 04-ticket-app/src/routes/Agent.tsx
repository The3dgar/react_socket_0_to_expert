import { SaveOutlined } from '@ant-design/icons';
import { Form, Input, Button, InputNumber, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStorage } from '../helper/getUserStorage';

const { Title, Text } = Typography;

interface FormProps {
  agent: string;
  desk: number;
}
export const Agent = () => {
  const navigate = useNavigate();

  const [user] = useState(getUserStorage());

  const onFinish = ({ agent, desk }: FormProps) => {
    localStorage.setItem('agent', agent);
    localStorage.setItem('desk', JSON.stringify(desk));
    navigate('/desk');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (user.agent && user.desk) {
    navigate('/desk');
  }
  return (
    <>
      <Title level={2}>Welcome</Title>
      <Text>Type your name</Text>
      <Form
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Agent'
          name='agent'
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Desk number'
          name='desk'
          rules={[
            { required: true, message: 'Please input your desk number!' },
          ]}>
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' shape='round'>
            <SaveOutlined />
            Access
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
