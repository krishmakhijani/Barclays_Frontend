
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Button, Descriptions } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// Assuming user data might come from a mock database or an API in real scenarios
// Here's a mock function to get user data based on username
const getUserData = (username) => {
  // This should be replaced by actual API call or database query
  // Returning mock data for demonstration
  return {
    name: `${username}`,
    email: `${username}`,
    role: 'Client',
    department: 'Technology'
  };
};

const ProfilePage = ({ username }) => {
  const navigate = useNavigate();

  // Get user data based on username prop
  const userData = getUserData(username);

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    navigate('/'); // Navigate to login after logout
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px',marginBottom: '150px' }}>
      <Card
        bordered={true}
        style={{
          width: 350,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h2 style={{ marginTop: '15px' }}>{userData.name}</h2>
        </div>

        <Descriptions column={1}>
          <Descriptions.Item label="Email" span={3}>

            {userData.email}
          </Descriptions.Item>
          <Descriptions.Item label="Role">{userData.role}</Descriptions.Item>
          <Descriptions.Item label="Department">{userData.department}</Descriptions.Item>
        </Descriptions>

        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{
            width: '100%',
            marginTop: '20px',
            backgroundColor: '#f5222d',
            borderColor: '#f5222d',
          }}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

ProfilePage.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfilePage;
