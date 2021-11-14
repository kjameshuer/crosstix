import React from "react";
import logo from 'images/logo-wide.svg'
import { logUserOut } from "authSlice";
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.authInfo);
    const loggedInText = isLoggedIn ? 'Logout' : 'Login';

    const handleIsLoggedIn = () => {
        localStorage.removeItem("crosstixToken");
        dispatch(logUserOut())
        return <Redirect to="/" />
    }
    const handleIsLoggedOut = () => {
        return <Redirect to="/signin" />
    }
    return (
        <div className="Header">
            <img className="Header__logo" src={logo} />
            <button onClick={isLoggedIn ? handleIsLoggedIn : handleIsLoggedOut}>
                {loggedInText}
            </button>
        </div>
    )
}

export default Header;