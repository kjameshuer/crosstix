import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.authInfo.isLoggedIn)
    if (isLoggedIn === null) {
        return <></>
    }
    return (
        <Route {...rest} render={props =>
            !isLoggedIn ? (
                <Redirect to='/signin' />
            ) : (
                <Component {...props} />
            )
        }
        />
    );
};
export default PrivateRoute;