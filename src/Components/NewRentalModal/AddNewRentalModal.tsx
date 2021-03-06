import React, { useRef, useState } from 'react';

import * as yup from 'yup';
import Loading from '../Common/Loading';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { errorToast, successToast } from '../../utils/toast/toast';
import { addNewRentalFormResolverShape } from './newRentalForm';
import { useRentalCardsContext } from '../../Context/RentalDataContext';
import { fetchAllRentalData, addNewRentalData } from '../../services/RentalDataServices';

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
  const { rentalData, setRentalData, cardsContainerStates, setCardContainerStates } = useRentalCardsContext();
  const [formStates, setFormStates] = useState(defaultFormStates);
  const { isLoading, isSuccess, isError } = formStates;
  const [containerHeight, setContainerHeight] = useState<number>();

  const rentalFormRef = useRef<HTMLFormElement>(null);

  const resolverScheme = yup.object().shape(addNewRentalFormResolverShape);

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
      const postNewRentalResponseBody = await addNewRentalData(requestData);
      setFormStates({ ...formStates, isLoading: false, isSuccess: true });
      successToast('Successfully added new rental');
      setShowNewRentalModal(!showNewRentalModal);

      hideModal();

      setCardContainerStates({ ...cardsContainerStates, isLoading: true });
      const apiResponse = await fetchAllRentalData();
      if (apiResponse.data && apiResponse.data.success) {
        const responseData = apiResponse.data.data;
        setRentalData(responseData);
        setCardContainerStates({ ...cardsContainerStates, isLoading: false, isSuccess: true });
      }
    } catch (err) {
      setFormStates({ ...formStates, isLoading: false, isError: true });
      errorToast('Error while adding new rental');
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

  const assignLoaderContainerHeight = () => {
    let formContainerHeight: number | undefined;
    formContainerHeight = rentalFormRef?.current?.getBoundingClientRect().height;
    setContainerHeight(formContainerHeight);
  };

  return (
    <Modal
      size='lg'
      show={showNewRentalModal}
      keyboard={true}
      onEntered={() => assignLoaderContainerHeight()}
      onHide={hideModal}
      centered
      // dialogClassName='homepage-filters-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Rental</Modal.Title>
      </Modal.Header>
      {isLoading ? (
        <Loading containerHeight={containerHeight} />
      ) : (
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
                  feedback={errors.vehicleImage2?.message}
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
