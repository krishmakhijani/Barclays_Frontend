import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Typography, Tooltip, Row, Button } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import AddComplaintPage from '../Add/AddComplaintPage'; // Make sure this path is correct

const { Paragraph, Title } = Typography;

const ComplaintsPage = ({ username }) => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddComplaint, setShowAddComplaint] = useState(false);
  const [expandedId, setExpandedId] = useState(null); // Track the expanded card for description

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.post('https://barclaysapp.rakikanneeswaran.workers.dev/api/user/mycomplaints', { username });
        setComplaints(response.data.complaints);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load complaints. Please try again.');
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [username]);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return <Spin tip="Loading complaints..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  if (showAddComplaint) {
    return <AddComplaintPage username={username} onClose={() => setShowAddComplaint(false)} />;
  }

  return (
    <>
      <div style={{ textAlign: 'right', margin: '16px' }}>
        <Button type="primary" onClick={() => setShowAddComplaint(true)}>
          Add Complaint
        </Button>
      </div>

      {complaints.length > 0 ? (
        <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {complaints.map((complaint) => (
            <Card
              key={complaint.id}
              style={{ width: 300, minHeight: 300, marginBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '8px', overflow: 'hidden' }}
              actions={[
                <Tooltip title="View Description" key={`desc-${complaint.id}`}><FileTextOutlined onClick={() => toggleDescription(complaint.id)} /></Tooltip>,
                complaint.status ? <Tooltip title="Resolved" key={`resolved-${complaint.id}`}><CheckCircleOutlined style={{ color: 'green' }} /></Tooltip> : <Tooltip title="Unresolved" key={`unresolved-${complaint.id}`}><CloseCircleOutlined style={{ color: 'red' }} /></Tooltip>,
                <Tooltip title={new Date(complaint.date).toLocaleDateString()} key={`date-${complaint.id}`}><CalendarOutlined /></Tooltip>,
              ]}
            >
              <Title level={4}>{complaint.title}</Title>
              <Paragraph>
                <strong>Status:</strong> {complaint.status ? 'Resolved' : 'Unresolved'}
              </Paragraph>
              <Paragraph>
                <strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}
              </Paragraph>
              {expandedId === complaint.id ? (
                <>
                  <Paragraph>
                    <strong>Description:</strong> {complaint.description}
                  </Paragraph>
                  <a onClick={() => toggleDescription(complaint.id)}>Show Less</a>
                </>
              ) : (
                <a onClick={() => toggleDescription(complaint.id)}>Show More</a>
              )}
            </Card>
          ))}
        </Row>
      ) : (
        <Alert message="No complaints found" type="info" showIcon />
      )}
    </>
  );
};

ComplaintsPage.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ComplaintsPage;
