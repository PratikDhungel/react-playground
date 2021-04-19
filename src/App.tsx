import React from 'react';
import NavBar from './NavBar/NavBar';
import CardsContainer from './Containers/CardsContainer';
import HomepageButtons from './Components/HomepageButtons';
import { RentalCardsContextProvider } from './Context/RentalDataContext';
// import ReactSelect from './React-Select/ReactSelect';

function App() {
  return (
    <div className='App'>
      {/* <ReactSelect /> */}
      <NavBar />
      <RentalCardsContextProvider>
        <HomepageButtons />
        <CardsContainer />
      </RentalCardsContextProvider>
    </div>
  );
}

export default App;
