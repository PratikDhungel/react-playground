import React from 'react';
import NavBar from './NavBar/NavBar';
import CardsContainer from './Containers/CardsContainer';
import { Button } from 'react-bootstrap';
// import ReactSelect from './React-Select/ReactSelect';

function App() {
  return (
    <div className='App'>
      {/* <ReactSelect /> */}
      <NavBar />
      <Button variant='primary'>Add New Rental</Button>
      <CardsContainer />
    </div>
  );
}

export default App;
