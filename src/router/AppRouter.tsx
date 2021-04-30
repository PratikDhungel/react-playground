import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../Components/auth/Login';
import { isAuthenticated } from '../utils/auth/authentication';
import { RentalCardsContextProvider } from '../Context/RentalDataContext';

import RentalPage from '../Components/rental-page/RentalPage';
import CardsContainer from '../Components/Homepage/CardsContainer';

const AppRouter = (): any => {
  return (
    <RentalCardsContextProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={CardsContainer} />
          <PrivateRoute path='/rental/:id' component={RentalPage} />
          <Route exact path='/login' render={(props) => (!isAuthenticated() ? <Login /> : <Redirect to='/' />)}></Route>
          <Route exact path='*'>
            <h1 style={{ color: 'black' }}>404 NOT FOUND</h1>
          </Route>
        </Switch>
      </Router>
    </RentalCardsContextProvider>
  );
};

export default AppRouter;
