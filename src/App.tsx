import React from 'react';
import NavBar from './NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../src/Components/auth/Login';
import CardsContainer from './Components/Homepage/CardsContainer';
import HomepageButtons from './Components/Homepage/HomepageButtons';
import AppRouter from './router/AppRouter';
import { RentalCardsContextProvider } from './Context/RentalDataContext';

function App() {
  return (
    <div className='App'>
      {/* <ReactSelect /> */}
      {/* <Login /> */}
      {/* <RentalCardsContextProvider> */}
      {/* <CardsContainer /> */}
      {/* </RentalCardsContextProvider> */}
      <AppRouter />
    </div>
  );
}

export default App;
