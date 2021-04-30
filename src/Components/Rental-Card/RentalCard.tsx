import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaIndustry, FaMotorcycle, FaRoad } from 'react-icons/fa';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RentalCard = ({ ...props }) => {
  const { id, manufacturer, modelName, distance, thumbnails } = props;
  const [currentImagePosition, setCurrentImagePosition] = useState<number>(0);
  const lengthOfSlides: number = thumbnails.length;

  const nextSlide = (): void => {
    setCurrentImagePosition(currentImagePosition === lengthOfSlides - 1 ? 0 : currentImagePosition + 1);
  };

  const prevSlide = (): void => {
    setCurrentImagePosition(currentImagePosition === 0 ? lengthOfSlides - 1 : currentImagePosition - 1);
  };

  return (
    <Col className='columns' md={6} lg={4}>
      <Card className='rental-card'>
        <FaChevronLeft className='arrow-btn arrow-btn__left' onClick={() => prevSlide()} />
        {thumbnails.map((imageURL: any, index: number) => {
          return (
            <div className={index === currentImagePosition ? 'slide-active' : 'slide'} key={index}>
              {index === currentImagePosition && <img src={imageURL} alt='IMAGE' />}
            </div>
          );
        })}
        <FaChevronRight className='arrow-btn arrow-btn__right' onClick={() => nextSlide()} />
        <div className='rental-card-details-container'>
          <Row>
            <Col className='icon-container' sm={4}>
              <p className='detail-text'>{manufacturer}</p>
            </Col>
            <Col className='icon-container' sm={4}>
              <p className='detail-text'>{modelName}</p>
            </Col>
            <Col className='icon-container' sm={4}>
              <p className='detail-text'>{distance} kms</p>
            </Col>
          </Row>
          <Row style={{ marginLeft: 0 }}>
            <Link to={`/rental/${id}`}>View Details</Link>
          </Row>
        </div>
      </Card>
    </Col>
  );
};

export default RentalCard;
