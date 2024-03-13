import  { useState } from 'react';
import axios from 'axios';
import { Button, Form, Select } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import './EditComplaintCardPage.css'; // Ensure you create this CSS file for styling

const { Option } = Select;

const EditComplEditQueryPageCard = ({ id, clientId, title, description, status, onEditComplete }) => {
  const [newStatus, setNewStatus] = useState(status ? 'true' : 'false');

  const handleSubmit = async () => {
    try {
      await axios.post('https://barclaysapp.rakikanneeswaran.workers.dev/api/admin/changecomplaintstatus', {
        id: id,
        status: newStatus === 'true'
      });
      console.log(id,status);
      toast.success('Query status updated successfully');
      onEditComplete(); // Call this function to signal that editing is complete and possibly switch view
    } catch (error) {
      toast.error('Failed to update query status');
    }
  };

  return (
    <div className="edit-complaint-page">
      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Client ID">
          <span className="ant-form-text">{clientId}</span>
        </Form.Item>
        <Form.Item label="Title">
          <span className="ant-form-text">{title}</span>
        </Form.Item>
        <Form.Item label="Description">
          <span className="ant-form-text">{description}</span>
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select defaultValue={status ? 'true' : 'false'} style={{ width: 120 }} onChange={setNewStatus}>
            <Option value="true">Solved</Option>
            <Option value="false">Unsolved</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

EditComplEditQueryPageCard.propTypes = {
  id: PropTypes.number.isRequired,
  clientId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onEditComplete: PropTypes.func.isRequired,
};

export default EditComplEditQueryPageCard;
