import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ ...props }) => {
  const { containerHeight } = props;
  return (
    <div className='spinner-container' style={{ height: `${containerHeight}px` }}>
      <Spinner animation='border' />
    </div>
  );
};

export default Loading;
