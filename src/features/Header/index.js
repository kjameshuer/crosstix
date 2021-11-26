import React from "react";
import logo from 'images/logo-wide.svg'
import { logUserOut } from "app/slices/authSlice";
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { isLoggedIn } = useSelector(state => state.authInfo);
    const loggedInText = isLoggedIn ? 'Logout' : 'Login';

    const handleIsLoggedIn = () => {
        localStorage.removeItem("crosstixToken");
        dispatch(logUserOut())
        history.push("/")
        // return <Redirect to={{ pathname: '/' }} />
    }
    const handleIsLoggedOut = () => {
        history.push("/signin")
    }
    return (
        <div className="Header">
            <img className="Header__logo" src={logo} alt={`Crosstix logo`} />
            <button onClick={isLoggedIn ? handleIsLoggedIn : handleIsLoggedOut}>
                {loggedInText}
            </button>
            {isLoggedIn && <Link to="/profile">My profile</Link>}
            {isLoggedIn && <Link to="/dashboard">My dashboard</Link>}
        </div>
    )
}

export default Header;