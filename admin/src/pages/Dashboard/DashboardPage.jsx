import { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from './barclays-icon.svg';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage'; // Update paths as needed
import ComplaintsPage from './ComplaintsPage';
import QueriesPage from './QueriesPage';
import ProfilePage from './ProfilePage';
import './DashboardPage.css'; // Make sure to create this CSS file

const { Header, Content, Sider } = Layout;

const DashboardPage = () => {
  const location = useLocation();
  const username = location.state?.username // Default to 'Guest' if username is not provided
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const getBreadcrumbItem = () => {
    switch (selectedKey) {
      case '1':
        return 'Home';
      case '2':
        return 'Complaints';
      case '3':
        return 'Queries';
      case '4':
        return 'Profile';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <HomePage username={username} />;
      case '2':
        return <ComplaintsPage username={username} />;
      case '3':
        return <QueriesPage username={username} />;
      case '4':
        return <ProfilePage username={username} />;
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
          <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>Complaints</Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>Queries</Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>Profile</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>admin</Breadcrumb.Item>
            <Breadcrumb.Item>{getBreadcrumbItem()}</Breadcrumb.Item>
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
