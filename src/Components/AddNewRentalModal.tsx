import React from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';

const AddNewRentalModal = ({ ...props }) => {
  const { showNewRentalModal, setShowNewRentalModal } = props;
  return (
    <Modal
      size='lg'
      show={showNewRentalModal}
      keyboard={true}
      onHide={() => setShowNewRentalModal(!showNewRentalModal)}
      centered
      // dialogClassName='homepage-filters-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Rental</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>Vehicle Manufacturer</Form.Label>
              <Form.Control as='select' name='manufacturer'>
                <option>Default</option>
                <option>Yamaha</option>
                <option>Suzuki</option>
                <option>Bajaj</option>
                <option>Hero</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Model Name</Form.Label>
              <Form.Control placeholder='FZ' name='model-name'></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Manufactured Year</Form.Label>
              <Form.Control placeholder='2016' name='year'></Form.Control>
            </Col>
            <Col>
              <Form.Label>Total Distance (kms)</Form.Label>
              <Form.Control placeholder='23442' name='distance'></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label>Vehicle Images</Form.Label>
            <Col>
              <Form.File id='vehicle-image-1' name='vehicle-image-1' />
            </Col>
            <Col>
              <Form.File id='vehicle-image-2' name='vehicle-image-2' />
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-filter-modal__save-btn' type='submit'>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewRentalModal;
