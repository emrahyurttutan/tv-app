import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  let urlRouteRole = rest.urlIsAuth(
    rest.path,
    rest.SN,
    rest.menu,
    rest.location.pathname
  );

  if (rest.MN) {
    const isAuthMethodName = rest.isAuthMethodName(
      rest.MN,
      rest.SN,
      rest.authmenu
    );
    urlRouteRole = isAuthMethodName ? 1 : 2;
  }

  return (
    <>
      <Route
        {...rest}
        render={props => {
          if (urlRouteRole === 2) {
            return <Redirect to="/access-denied" />;
          } else if (urlRouteRole === 1) {
            return <Component {...props} />;
          }
        }}
      />
    </>
  );
};

export default withRouter(AuthRoute);
