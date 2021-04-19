import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Modal, Form, Col, Spinner } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import Loading from './Common/Loading';

const apiBaseURL = `http://localhost:5000/api/v1/`;
const addNewRentalEndpoint = `rentals/addNewRental`;
const imagesFolderPath = `images`;

const defaultFormValues = {
  manufacturer: '',
  modelName: '',
  year: '',
  distance: '',
  vehicleImage1: '',
  vehicleImage2: '',
};

const defaultFormStates = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const AddNewRentalModal = ({ ...props }) => {
  const { showNewRentalModal, setShowNewRentalModal } = props;
  const [formStates, setFormStates] = useState(defaultFormStates);
  const { isLoading, isSuccess, isError } = formStates;
  const [newContainerHeight, setNewContainerHeight] = useState();

  const rentalFormRef = useRef<HTMLFormElement>(null);

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
    vehicleImage2: yup.mixed().test('Empty', 'Image is required', (value: any) => {
      if (value.length === 0) {
        return false;
      }
      return true;
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resolverScheme) });

  const submitNewRentalForm = async (data: any) => {
    const fileName1 = data.vehicleImage1[0].name;
    const fileName2 = data.vehicleImage2[0].name;
    const filePath1 = `${imagesFolderPath}/${fileName1}`;
    const filePath2 = `${imagesFolderPath}/${fileName2}`;

    let requestData = { ...data, vehicleImage1: filePath1, vehicleImage2: filePath2 };
    requestData = JSON.stringify(requestData);

    try {
      setFormStates({ ...formStates, isLoading: true });
      const apiResponse = await fetch(`${apiBaseURL}${addNewRentalEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData,
      });
      const responseBody = await apiResponse.json();
      reset({ defaultFormValues });
      setFormStates({ ...formStates, isLoading: false, isSuccess: true });
    } catch (err) {
      setFormStates({ ...formStates, isLoading: false, isError: true });
      console.log(err);
    }
  };

  const handleErrors = (errors: any) => {
    console.log(errors);
  };

  const hideModal = () => {
    setShowNewRentalModal(!showNewRentalModal);
    reset(defaultFormValues);
  };

  let formContainerHeight: any;

  const setContainerHeight = () => {
    formContainerHeight = rentalFormRef?.current?.getBoundingClientRect().height;
    setNewContainerHeight(formContainerHeight);
  };

  return (
    <Modal
      size='lg'
      show={showNewRentalModal}
      keyboard={true}
      onEntered={() => setContainerHeight()}
      onHide={() => hideModal()}
      centered
      // dialogClassName='homepage-filters-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Rental</Modal.Title>
      </Modal.Header>
      {isLoading ? (
        <Loading newContainerHeight={newContainerHeight} />
      ) : (
        // <div className='spinner-container' style={{ height: `${newContainerHeight}px` }}>
        //   <Spinner animation='border' />
        // </div>
        <Form onSubmit={handleSubmit(submitNewRentalForm, handleErrors)} ref={rentalFormRef}>
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
                  <option>KTM</option>
                  <option>Honda</option>
                  <option>Kawasaki</option>
                  <option>Triumph</option>
                  <option>Royal Enfield</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.manufacturer?.message}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>Model Name</Form.Label>
                <Form.Control
                  placeholder='E.g. MT-09'
                  {...register('modelName')}
                  isInvalid={!!errors.modelName}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.modelName?.message}</Form.Control.Feedback>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>Manufactured Year</Form.Label>
                <Form.Control placeholder='E.g. 2016' {...register('year')} isInvalid={!!errors.year}></Form.Control>
                <Form.Control.Feedback type='invalid'>{errors.year?.message}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>Total Distance (kms)</Form.Label>
                <Form.Control
                  placeholder='E.g. 23442'
                  {...register('distance')}
                  isInvalid={!!errors.distance}
                ></Form.Control>
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
            <Form.Row>
              <Col sm={6}>
                <Form.File
                  id='vehicle-image-2'
                  {...register('vehicleImage2')}
                  isInvalid={!!errors.vehicleImage2}
                  feedback={errors.vehicleImage1?.message}
                />
                <Form.Control.Feedback type='invalid'>{errors.vehicleImage2?.message}</Form.Control.Feedback>
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-filter-modal__save-btn' type='submit'>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
};

export default AddNewRentalModal;
