import React, { useState } from 'react';
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
      <Modal
        show={showNewRentalModal}
        keyboard={true}
        onHide={() => setShowNewRentalModal(!showNewRentalModal)}
        centered
        // dialogClassName='homepage-filters-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Rental</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-filter-modal__save-btn'>Add</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomepageButtons;
