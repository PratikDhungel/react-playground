import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import RentalCard from '../Components/RentalCard';

const apiBaseURL = `http://localhost:5000/api/v1/`;
const getAllRentalsEndpoint = `rentals/getAllRentals`;

const CardsContainer = () => {
  const [rentalData, setRentalData] = useState([]);

  const fetchAvailableRentals = async () => {
    try {
      // setIsLoading(true);
      const response = await fetch(`${apiBaseURL}${getAllRentalsEndpoint}`);
      const responseBody = await response.json();
      let responseData = responseBody.data;
      // console.log(responseData);
      setRentalData(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAvailableRentals();
  }, []);

  return (
    <Container fluid className='cards-container'>
      <Row noGutters>
        {rentalData.map((rental: any, index: number) => {
          const { id, manufacturer, modelName, distance, vehicleImage1, vehicleImage2 } = rental;
          const thumbnails = [vehicleImage1, vehicleImage2];
          return (
            <RentalCard id={id} manufacturer={manufacturer} modelName={modelName} thumbnails={thumbnails} key={index} />
          );
        })}

        {/* <Col className='columns' md={4}>
          <Card>
            This is card content This is card content This is card content This is card content This is card content This is
            card content This is card content This is card content
          </Card>
        </Col>
        <Col className='columns' md={4}>
          <Card>
            This is card content This is card content This is card content This is card content This is card content This is
            card content This is card content This is card content
          </Card>
        </Col>
        <Col className='columns' md={4}>
          <Card>
            This is card content This is card content This is card content This is card content This is card content This is
            card content This is card content This is card content
          </Card>
        </Col>
        <Col className='columns' md={4}>
          <Card>
            This is card content This is card content This is card content This is card content This is card content This is
            card content This is card content This is card content
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default CardsContainer;
