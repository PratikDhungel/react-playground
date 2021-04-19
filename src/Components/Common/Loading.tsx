import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ ...props }) => {
  const { newContainerHeight } = props;
  return (
    <div className='spinner-container' style={{ height: `${newContainerHeight}px` }}>
      <Spinner animation='border' />
    </div>
  );
};

export default Loading;
