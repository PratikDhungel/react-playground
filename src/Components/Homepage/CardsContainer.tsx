import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Loading from '../Common/Loading';
import RentalCard from '../Rental-Card/RentalCard';
import { useRentalCardsContext } from '../../Context/RentalDataContext';
import { fetchAllRentalData } from '../../services/RentalDataServices';
import { errorToast, successToast } from '../../utils/toast/toast';

const CardsContainer = () => {
  const { rentalData, setRentalData, cardsContainerStates, setCardContainerStates } = useRentalCardsContext();
  const { isLoading, isSuccess, isError } = cardsContainerStates;

  const fetchAvailableRentals = async () => {
    try {
      setCardContainerStates({ ...cardsContainerStates, isLoading: true });
      const apiResponse = await fetchAllRentalData();
      if (apiResponse.data && apiResponse.data.success) {
        const responseData = apiResponse.data.data;
        setRentalData(responseData);
        setCardContainerStates({ ...cardsContainerStates, isLoading: false, isSuccess: true });
        // successToast('Successfully fetched rental data');
      }
    } catch (err) {
      setCardContainerStates({ ...cardsContainerStates, isLoading: false, isError: true });
      errorToast('Error while fetching rental data');
    }
  };

  useEffect(() => {
    fetchAvailableRentals();
  }, []);

  return (
    <Container fluid className='cards-container'>
      {isLoading ? (
        <Loading newContainerHeight='500'></Loading>
      ) : (
        <Row noGutters>
          {rentalData?.map((rental: any, index: number) => {
            const { id, manufacturer, modelName, distance, vehicleImage1, vehicleImage2 } = rental;
            const thumbnails = [vehicleImage1, vehicleImage2];
            return (
              <RentalCard
                id={id}
                manufacturer={manufacturer}
                modelName={modelName}
                distance={distance}
                thumbnails={thumbnails}
                key={index}
              />
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default CardsContainer;
