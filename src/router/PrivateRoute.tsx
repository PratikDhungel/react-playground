// import { env } from 'process';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { isAuthenticated } from '../utils/auth/authentication';
import { isPropertySignature } from 'typescript';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
