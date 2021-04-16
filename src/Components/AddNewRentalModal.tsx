import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';

const apiBaseURL = `http://localhost:5000/api/v1/`;
const imagesFolderPath = `/Users/pratikdhungel/Code/react-playground/images`;

const defaultFormValues = {
  manufacturer: '',
  modelName: '',
  year: '',
  distance: '',
  vehicleImage1: '',
};

const defaultFormStates = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const AddNewRentalModal = ({ ...props }) => {
  const { showNewRentalModal, setShowNewRentalModal } = props;
  const [formStates, setFormStates] = useState({ defaultFormStates });

  const resolverScheme = yup.object().shape({
    manufacturer: yup.string().required('Manufacturer is required'),
    modelName: yup.string().required('Model Name is required'),
    year: yup
      .string()
      .notRequired()
      .test('Number only', 'Year should be a number', (value: any) => {
        const numberRegex = /^\d*\.?\d*$/;
        if (numberRegex.test(value)) {
          return true;
        }
        return false;
      })
      .test('Year too old', 'Should be greater than 1950', (value: any) => {
        console.log(value, !value);
        const numValue = Number(value);
        if (!value || numValue > 1950) {
          return true;
        }
        return false;
      }),
    distance: yup
      .string()
      .required('Distance is required')
      .test('Number only', 'Distance should be a number', (value: any) => {
        const numberRegex = /^\d*\.?\d*$/;
        if (numberRegex.test(value)) {
          return true;
        }
        return false;
      }),
    vehicleImage1: yup.mixed().test('Empty', 'Image is required', (value: any) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    }),
    // vehicleImage2: yup.mixed().test('Empty', 'Image is required', (value: any) => {
    //   console.log(value);
    //   if (value.length === 0) {
    //     return false;
    //   }
    //   return true;
    // }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resolverScheme) });

  const submitNewRentalForm = async (data: any) => {
    console.log(data);
    const fileName = data.vehicleImage1[0].name;
    const filePath = `${imagesFolderPath}/${fileName}`;
    console.log(filePath);

    // const requestData = ;
  };

  const handleErrors = (errors: any) => {
    console.log(errors);
  };

  const hideModal = () => {
    setShowNewRentalModal(!showNewRentalModal);
    reset(defaultFormValues);
  };

  return (
    <Modal
      size='lg'
      show={showNewRentalModal}
      keyboard={true}
      onHide={() => hideModal()}
      centered
      // dialogClassName='homepage-filters-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Rental</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(submitNewRentalForm, handleErrors)}>
        <Modal.Body>
          <Form.Row>
            <Col>
              <Form.Label>Vehicle Manufacturer</Form.Label>
              <Form.Control
                as='select'
                {...register('manufacturer')}
                isInvalid={!!errors.manufacturer}
                className='select-list-error-icon'
              >
                <option value='' selected disabled>
                  Select
                </option>
                <option>Yamaha</option>
                <option>Suzuki</option>
                <option>Bajaj</option>
                <option>Hero</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.manufacturer?.message}</Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>Model Name</Form.Label>
              <Form.Control placeholder='FZ' {...register('modelName')} isInvalid={!!errors.modelName}></Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.modelName?.message}</Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Manufactured Year</Form.Label>
              <Form.Control placeholder='2016' {...register('year')} isInvalid={!!errors.year}></Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.year?.message}</Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>Total Distance (kms)</Form.Label>
              <Form.Control placeholder='23442' {...register('distance')} isInvalid={!!errors.distance}></Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.distance?.message}</Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={6}>
              <Form.Label>Vehicle Images</Form.Label>
              <Form.File
                id='vehicle-image-1'
                {...register('vehicleImage1')}
                isInvalid={!!errors.vehicleImage1}
                feedback={errors.vehicleImage1?.message}
              />
            </Col>
          </Form.Row>
          {/* <Form.Row>
            <Col sm={6}>
              <Form.File
                id='vehicle-image-2'
                {...register('vehicleImage2')}
                isInvalid={!!errors.vehicleImage2}
                feedback={errors.vehicleImage1?.message}
              />
              <Form.Control.Feedback type='invalid'>{errors.vehicleImage2?.message}</Form.Control.Feedback>
            </Col>
          </Form.Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-filter-modal__save-btn' type='submit'>
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddNewRentalModal;
