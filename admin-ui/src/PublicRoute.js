import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "./utils/authService";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !authService.isExistsToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);

export default PublicRoute;
