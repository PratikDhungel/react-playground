import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CardsContainer = () => {
  return (
    <Container fluid className='cards-container'>
      <Row noGutters>
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
        </Col>
      </Row>
    </Container>
  );
};

export default CardsContainer;
