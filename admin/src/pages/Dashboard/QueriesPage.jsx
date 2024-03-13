import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComplaintCard from './ComplaintCard'; // Make sure to create this component
import './ComplaintsPage.css'; // Add your CSS for styling

const { Search } = Input;
const { Option } = Select;

const QueriesPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('https://barclaysapp.rakikanneeswaran.workers.dev/api/admin/querybulk');
      setQueries(response.data.queries);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching queries');
      setLoading(false);
    }
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const filteredQueries = queries.filter(query => {
    const statusMatch = filter === '' || (filter === 'solved' && query.status) || (filter === 'unsolved' && !query.status);
    const searchTermMatch = query.clientId.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchTermMatch;
  });

  return (
    <div className="complaints-page">
      <ToastContainer />
      <div className="search-filter-section">
        <Search placeholder="Search by user" onSearch={setSearchTerm} style={{ width: 200, marginRight: '16px' }} />
        <Select placeholder="Filter by status" onChange={handleFilterChange} allowClear style={{ width: 200 }}>
          <Option value="solved">Solved</Option>
          <Option value="unsolved">Unsolved</Option>
        </Select>
      </div>
      {loading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }} />
      ) : (
        <div className="complaints-container">
          {filteredQueries.map(queries => (
            <ComplaintCard key={queries.id} complaint={queries} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QueriesPage;
