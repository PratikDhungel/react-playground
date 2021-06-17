import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../Components/auth/Login';
import { isAuthenticated } from '../utils/auth/authentication';
import { RentalCardsContextProvider } from '../Context/RentalDataContext';

import RentalPage from '../Components/rental-page/RentalPage';
import MyRentals from '../Components/MyRentals/MyRentals';
import CardsContainer from '../Components/Homepage/CardsContainer';
import InfiniteScrolling from '../Components/infinite-scrolling/InfiniteScrolling';

const AppRouter = (): any => {
  return (
    <RentalCardsContextProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={CardsContainer} />
          <PrivateRoute path='/rental/:id' component={RentalPage} />
          <PrivateRoute path='/my-rentals' component={MyRentals} />
          <Route path='/scroll' component={InfiniteScrolling} />
          {/* <Route exact path='/login' render={(props) => (!isAuthenticated() ? <Login /> : <Redirect to='/' />)}></Route> */}
          <Route exact path='*'>
            <h1 style={{ color: 'black' }}>404 NOT FOUND</h1>
          </Route>
        </Switch>
      </Router>
    </RentalCardsContextProvider>
  );
};

export default AppRouter;
