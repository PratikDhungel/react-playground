import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Col, Card } from 'react-bootstrap';

// import filePath from '../images/1.jpg';

// interface RentalCardInfoProps {
//   id: string;
//   title: string;
//   thumbnails: string[];
// }

const RentalCard = ({ ...props }) => {
  const { manufacturer, modelName, distance, thumbnails } = props;
  console.log(thumbnails);
  const [currentImagePosition, setcurrentImagePosition] = useState<number>(0);
  const lengthOfSlides: number = thumbnails.length;

  const nextSlide = (): void => {
    setcurrentImagePosition(currentImagePosition === lengthOfSlides - 1 ? 0 : currentImagePosition + 1);
  };

  const prevSlide = (): void => {
    setcurrentImagePosition(currentImagePosition === 0 ? lengthOfSlides - 1 : currentImagePosition - 1);
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
        <p>{manufacturer}</p>
        <p>{modelName}</p>
        <p>{distance}</p>
      </Card>
    </Col>
  );
};

export default RentalCard;
