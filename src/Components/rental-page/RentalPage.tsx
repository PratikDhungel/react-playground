import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight, FaIndustry, FaMotorcycle, FaRoad } from 'react-icons/fa';
// import { Row, Col, Card } from 'react-bootstrap';

interface IRentalPageParams {
  id: string;
}

const RentalPage = () => {
  const { id } = useParams<IRentalPageParams>();

  return <div>This is the rental page {id}</div>;
};

export default RentalPage;
