import { Form, Input, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddComplaintPage.css'; // Make sure this CSS path is correct for your project structure

const AddComplaintPage = ({ username, onClose }) => {
  const [form] = Form.useForm();

  async function myfunction(values) {
    try {
      const response = await fetch('https://barclaysapp.rakikanneeswaran.workers.dev/api/user/addmycomplaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: username, // Assuming this is how you identify users on your backend
          title: values.title,
          description: values.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json(); // Assuming you're handling the response as needed
      toast.success('Complaint added successfully!');
      onClose(); // Make sure this either closes a modal or navigates back
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Failed to add the complaint. Please try again.');
    }
  }

  return (
    <>
      <Card title="Add New Complaint" bordered={false} className="add-complaint-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={myfunction}
          initialValues={{ title: '', description: '' }}
        >
          <Form.Item
            name="title"
            label="Title of Your Complaint"
            rules={[{ required: true, message: 'Please input the title of your complaint!' }]}
          >
            <Input className="input-field" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description of Your Complaint"
            rules={[{ required: true, message: 'Please input the description of your complaint!' }]}
          >
            <Input.TextArea className="textarea-field" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-btn">
              Add Complaint
            </Button>
            <Button onClick={onClose} className="cancel-btn" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </>
  );
};

AddComplaintPage.propTypes = {
  username: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddComplaintPage;
