import React from 'react';
import { Route } from "react-router-dom";
import PropTypes from 'prop-types'
import AuthContext from '../auth/AuthContext';

function PrivateRoute ({component: Component, scopes, ...rest}) {
    return (
        <AuthContext.Consumer>
            { auth => (
                <Route {...rest}
                   render={ props => {

                       if (!auth.isLoggedIn()) {
                           return auth.login();
                       }

                       if (scopes.length > 0 && !auth.userHasAllScopes(scopes)) {
                           return <h1> You don't have the needed scopes {scopes.join(",") } </h1>
                       }

                       return <Component auth={auth} {...props} />
                   }}
                />

            )}
        </AuthContext.Consumer>
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
    scopes: []
}

export default PrivateRoute;