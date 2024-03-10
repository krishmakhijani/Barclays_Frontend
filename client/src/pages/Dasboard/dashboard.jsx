import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Dashboard.css'; // Make sure this path is correct
import ComplaintsPage from './Complaints';
import { useLocation } from 'react-router-dom';
import logo from './barclays-icon.svg';


const { Header, Content, Sider } = Layout;

const DashboardPage = () => {
    const location = useLocation();
  const username = location.state?.username;
  const [collapsed, setCollapsed] = useState(false);

  // Function to handle the collapse event of the Sider
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };




  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >
        <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/">Complaints</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/queries">Queries</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/team">Team</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
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
          <Routes>
            {/* Update this route to match the link destination */}
            <Route index element={<ComplaintsPage username={username} />} />
            <Route path="/queries" element={<div>Queries Content</div>} />
            <Route path="/team" element={<div>Team Content</div>} />
            <Route path="/profile" element={<div>Profile Content</div>} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
