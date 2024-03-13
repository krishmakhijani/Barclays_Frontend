import { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './ComplaintCard.css';
import EditComplaintCardPage from '../EditComplaintCard/EditComplaintCardPage';

const ComplaintCard = ({ complaint }) => {
  const [showMore, setShowMore] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const words = complaint.description.split(' ');
  const showToggle = words.length > 10;
  const displayedText = showMore ? complaint.description : words.slice(0, 10).join(' ') + (showToggle ? '...' : '');

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const showModal = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <div className="complaint-card fade-in">
      <Card
        title={complaint.title}
        extra={<span className={complaint.status ? 'status-solved' : 'status-unsolved'}>
                {complaint.status ? 'Solved' : 'Unsolved'}
               </span>}
        style={{ width: '100%', marginBottom: '16px' }}
        actions={[
          <Button type="primary" icon={<RightOutlined />} onClick={showModal} key="edit-details">
            Edit Details
          </Button>
        ]}
      >
        <div className="complaint-card-content">
          <p><strong>User:</strong> {complaint.clientId}</p>
          <p>{displayedText}</p>
          {showToggle && (
            <a onClick={toggleShowMore} className="show-more-less">{showMore ? 'Show Less' : 'Show More'}</a>
          )}
        </div>
</Card>
<Modal
     title="Edit Complaint"
     visible={isEditMode}
     onCancel={handleCancel}
     footer={null}
     destroyOnClose={true}
   >
<EditComplaintCardPage
       id={complaint.id}
       clientId={complaint.clientId}
       title={complaint.title}
       description={complaint.description}
       status={complaint.status}
       onEditComplete={handleCancel}
     />
</Modal>
</div>
);
};

ComplaintCard.propTypes = {
complaint: PropTypes.shape({
id: PropTypes.number.isRequired,
clientId: PropTypes.string.isRequired,
status: PropTypes.bool.isRequired,
title: PropTypes.string.isRequired,
description: PropTypes.string.isRequired,
date: PropTypes.string,
}).isRequired,
};

export default ComplaintCard;