import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Typography, Row, Tooltip, Button } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,

} from '@ant-design/icons';
import PropTypes from 'prop-types';
import './Queries.css';
import AddQueryPage from '../Add/AddQueryPage';

const { Paragraph, Title } = Typography;

const Queries = ({ username }) => {
  const [showAddQuery, setShowAddQuery] = useState(false);
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.post('https://barclaysapp.rakikanneeswaran.workers.dev/api/user/myqueries', { username });
        setQueries(response.data.queries);
        setIsLoading(false);
        console.log(response.data);
      } catch (err) {
        setError('Failed to load Queries. Please try again.');
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [username]);

  if (isLoading) {
    return <Spin tip="Loading queries..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  if (showAddQuery) {
    return <AddQueryPage username={username} onClose={() => setShowAddQuery(false)} />;
  }

  return (
    <>
    <div style={{ textAlign: 'right', margin: '16px' }}>
        <Button type="primary" onClick={() => setShowAddQuery(true)}>
          Add Query
        </Button>
      </div>
    {queries.length > 0 ? (
      <Row gutter={[16, 16]} className="queries-row">
        {queries.length > 0 ? (
        <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {queries.map((query) => (
            <Card
              key={query.id}
              style={{ width: 300, minHeight: 300, marginBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '8px', overflow: 'hidden' }}
              actions={[
                <Tooltip title="View Description" key={`desc-${query.id}`}><FileTextOutlined onClick={() => toggleDescription(query.id)} /></Tooltip>,
                query.status ? <Tooltip title="Resolved" key={`resolved-${query.id}`}><CheckCircleOutlined style={{ color: 'green' }} /></Tooltip> : <Tooltip title="Unresolved" key={`unresolved-${query.id}`}><CloseCircleOutlined style={{ color: 'red' }} /></Tooltip>,
                <Tooltip title={new Date(query.date).toLocaleDateString()} key={`date-${query.id}`}><CalendarOutlined /></Tooltip>,
              ]}
            >
              <Title level={4}>{query.title}</Title>
              <Paragraph>
                <strong>Status:</strong> {query.status ? 'Resolved' : 'Unresolved'}
              </Paragraph>
              <Paragraph>
                <strong>Date:</strong> {new Date(query.date).toLocaleDateString()}
              </Paragraph>
              {expandedId === query.id ? (
                <>
                  <Paragraph>
                    <strong>Description:</strong> {query.description}
                  </Paragraph>
                  <a onClick={() => toggleDescription(query.id)}>Show Less</a>
                </>
              ) : (
                <a onClick={() => toggleDescription(query.id)}>Show More</a>
              )}
            </Card>
          ))}
        </Row>
      ) : (
        <Alert message="No complaints found" type="info" showIcon />
      )}
      </Row>
    ) : (
      <Alert message="No queries found" type="info" showIcon />
    )}
  </>
  );
};

Queries.propTypes = {
    username: PropTypes.string.isRequired,
  };

export default Queries;
