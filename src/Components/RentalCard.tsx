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
  const [currentImage, setCurrentImage] = useState<number>(0);
  const lengthOfSlides: number = thumbnails.length;

  const nextSlide = (): void => {
    setCurrentImage(currentImage === lengthOfSlides - 1 ? 0 : currentImage + 1);
  };

  const prevSlide = (): void => {
    setCurrentImage(currentImage === 0 ? lengthOfSlides - 1 : currentImage - 1);
  };

  return (
    <Col className='columns' md={6} lg={4}>
      <Card className='rental-card'>
        <FaChevronLeft className='arrow-btn arrow-btn__left' onClick={() => prevSlide()} />
        {thumbnails.map((imageURL: any, index: number) => {
          return (
            <div className={index === currentImage ? 'slide-active' : 'slide'} key={index}>
              {index === currentImage && <img src={imageURL} alt='IMAGE' />}
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
