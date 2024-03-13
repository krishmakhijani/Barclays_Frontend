import { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './QueryCard.css';
import EditQueryPageCard from '../EditQueriesCard/EditQueryCardPage';

const QueryCard = ({ query }) => {
  const [showMore, setShowMore] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const words = query.description.split(' ');
  const showToggle = words.length > 10;
  const displayedText = showMore ? query.description : words.slice(0, 10).join(' ') + (showToggle ? '...' : '');

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
        title={query.title}
        extra={<span className={query.status ? 'status-solved' : 'status-unsolved'}>
                {query.status ? 'Solved' : 'Unsolved'}
               </span>}
        style={{ width: '100%', marginBottom: '16px' }}
        actions={[
          <Button type="primary" icon={<RightOutlined />} onClick={showModal} key="edit-details">
            Edit Details
          </Button>
        ]}
      >
        <div className="complaint-card-content">
          <p><strong>User:</strong> {query.clientId}</p>
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
<EditQueryPageCard
       id={query.id}
       clientId={query.clientId}
       title={query.title}
       description={query.description}
       status={query.status}
       onEditComplete={handleCancel}
     />
</Modal>
</div>
);
};

QueryCard.propTypes = {
query: PropTypes.shape({
id: PropTypes.number.isRequired,
clientId: PropTypes.string.isRequired,
status: PropTypes.bool.isRequired,
title: PropTypes.string.isRequired,
description: PropTypes.string.isRequired,
date: PropTypes.string,
}).isRequired,
};

export default QueryCard;