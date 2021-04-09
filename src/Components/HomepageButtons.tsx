import React, { useState } from 'react';
import AddNewRentalModal from './AddNewRentalModal';
import { Button, Modal } from 'react-bootstrap';

const HomepageButtons = () => {
  const [showNewRentalModal, setShowNewRentalModal] = useState<boolean>(false);

  return (
    <>
      <div className='homepage-buttons-container'>
        <Button variant='primary' onClick={() => setShowNewRentalModal(!showNewRentalModal)}>
          Add New Rental
        </Button>
      </div>
      <AddNewRentalModal showNewRentalModal={showNewRentalModal} setShowNewRentalModal={setShowNewRentalModal} />
    </>
  );
};

export default HomepageButtons;
