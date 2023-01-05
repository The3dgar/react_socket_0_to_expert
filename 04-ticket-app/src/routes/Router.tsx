import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import {Agent, Desk,Queue, Ticket} from './index'
import { UiContext } from '../context/UiContext';
import { useContext } from 'react';

const { Sider, Content } = Layout;

export const Router = () => {

  const {showMenu} = useContext(UiContext);
  return (
    <BrowserRouter>
      <Layout style={{ height: '100vh' }}>
        <Sider collapsedWidth={0} breakpoint='md' hidden={!showMenu}>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1' icon={<UserOutlined />}>
              <Link to='/agent'>Ingresar</Link>
            </Menu.Item>

            <Menu.Item key='2' icon={<VideoCameraOutlined />}>
              <Link to='/queue'>Cola</Link>
            </Menu.Item>

            <Menu.Item key='3' icon={<UploadOutlined />}>
              <Link to='/ticket'>Nuevo Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Content
            className='site-layout-background'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>
            <Routes>
              <Route path='/agent' element={<Agent />} />
              <Route path='/queue' element={<Queue />} />
              <Route path='/ticket' element={<Ticket />} />
              <Route path='/desk' element={<Desk />} />
              <Route path="*" element={<Navigate to ="/agent" />}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
