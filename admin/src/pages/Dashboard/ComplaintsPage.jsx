import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComplaintCard from './ComplaintCard'; // Make sure to create this component
import './ComplaintsPage.css'; // Add your CSS for styling

const { Search } = Input;
const { Option } = Select;

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('https://barclaysapp.rakikanneeswaran.workers.dev/api/admin/compliantbulk');
      setComplaints(response.data.complaints);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching complaints');
      setLoading(false);
    }
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = filter === '' || (filter === 'solved' && complaint.status) || (filter === 'unsolved' && !complaint.status);
    const searchTermMatch = complaint.clientId.toLowerCase().includes(searchTerm.toLowerCase());
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
          {filteredComplaints.map(complaint => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;
