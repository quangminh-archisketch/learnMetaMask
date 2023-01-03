import React, { useState } from 'react';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const Dashboard = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('DashBoard', '1', <PieChartOutlined />),
    getItem('Film', '2', <DesktopOutlined />, [getItem('List', '3'), getItem('Create', '4')]),
    getItem('User', 'sub1', <UserOutlined />, [getItem('List', '5'), getItem('Create', '6')]),
  ];

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
        <Layout className='site-layout'></Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
