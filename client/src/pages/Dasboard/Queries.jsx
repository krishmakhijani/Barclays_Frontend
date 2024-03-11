import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Typography, Row } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Paragraph, Title } = Typography;

const Queries = ({ username }) => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        // As GET requests should not have a body, consider passing username in a different way.
        // This is a placeholder for how you might handle it if the API were different.
        const response = await axios.get(`https://barclaysapp.rakikanneeswaran.workers.dev/api/user/myqueries?username=${username}`);
        console.log(response);
        setQueries(response.data.queries); // Adjust according to your actual response structure
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load queries. Please try again.');
        setIsLoading(false);
      }
    };

    if (username) {
      fetchQueries();
    }
  }, [username]);

  if (isLoading) {
    return <Spin tip="Loading queries..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <>
      {queries.length > 0 ? (
        <Row gutter={[16, 16]} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {queries.map((query) => (
            <Card
              key={query.id}
              style={{ width: 300, minHeight: 300, marginBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '8px', overflow: 'hidden' }}
              actions={[
                query.status ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />,
              ]}
            >
              <Title level={4}>{query.title}</Title>
              <Paragraph>
                <strong>Status:</strong> {query.status ? 'Resolved' : 'Unresolved'}
              </Paragraph>
              <Paragraph>
                <strong>Description:</strong> {query.description}
              </Paragraph>
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
