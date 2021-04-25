import React from 'react';
import NavBar from './NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import CardsContainer from './Components/Homepage/CardsContainer';
import HomepageButtons from './Components/Homepage/HomepageButtons';
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
