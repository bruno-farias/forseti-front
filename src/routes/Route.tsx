import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const isSignedIn = false;

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === isSignedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/signin' : '/',
            }}
          />
        );
      }}
    />
  );
};

export default Route;
