import React from 'react';
import NavBar from './NavBar/NavBar';
import CardsContainer from './Containers/CardsContainer';
// import ReactSelect from './React-Select/ReactSelect';

function App() {
  return (
    <div className='App'>
      {/* <ReactSelect /> */}
      <NavBar />
      <CardsContainer />
    </div>
  );
}

export default App;
