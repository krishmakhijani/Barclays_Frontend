import { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Dashboard.css';
import ComplaintsPage from './Complaints';
import { useLocation } from 'react-router-dom';
import logo from './barclays-icon.svg';
import Queries from './Queries';

const { Header, Content, Sider } = Layout;

const DashboardPage = () => {
  const location = useLocation();
  const username = location.state?.username;
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <ComplaintsPage username={username} />;
      case '2':
        return <Queries username={username}/>;
      case '3':
        return <div>Team Content</div>;
      case '4':
        return <div>Profile Content</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>Complaints</Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>Queries</Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>Team</Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>Profile</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
