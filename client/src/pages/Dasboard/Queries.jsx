import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Typography, Row, Tooltip, Button } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  MoreOutlined,
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
        {queries.map((query) => (
          <Card
            key={query.id}
            className="query-card"
            actions={[
              <Tooltip title="View Description" key={query.id}>
                <FileTextOutlined onClick={() => toggleDescription(query.id)} />
              </Tooltip>,
              query.status ? (
                <Tooltip title="Resolved">
                  <CheckCircleOutlined className="icon-resolved" />
                </Tooltip>
              ) : (
                <Tooltip title="Unresolved">
                  <CloseCircleOutlined className="icon-unresolved" />
                </Tooltip>
              ),
              <Tooltip title="More" key={query.id}>
                <MoreOutlined />
              </Tooltip>,
            ]}
          >
            <Title level={4}>{query.title}</Title>
            <Paragraph>
              <strong>Status:</strong> {query.status ? 'Resolved' : 'Unresolved'}
            </Paragraph>
            {expandedId === query.id ? (
              <>
                <Paragraph>
                  <strong>Description:</strong> {query.description}
                </Paragraph>
                <Button type="link" onClick={() => toggleDescription(null)}>Show Less</Button>
              </>
            ) : (
              <Button type="link" onClick={() => toggleDescription(query.id)}>Show More</Button>
            )}
          </Card>
        ))}
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
