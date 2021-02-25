import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CardsContainer = () => {
  return (
    <Container fluid style={{ marginTop: '2em' }}>
      <Row noGutters>
        <Col className='columns' sm={4}>
          <Card>
            This is card content This is card content This is card content This is card content This is card content This is
            card content This is card content This is card content
          </Card>
        </Col>
        <Col className='columns' sm={4}>
          <Card>
            This is card content This is card content This is card content This is card content This is card content This is
            card content This is card content This is card content
          </Card>
        </Col>
        <Col className='columns' sm={4}>
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
