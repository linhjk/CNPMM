import React from 'react';
import { Route, Redirect } from 'react-router-dom';



export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    const currentUser = localStorage.getItem("currentToken");
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return <Redirect to= '/login' />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
);