import React, { useState, useEffect } from 'react';
import { signUserIn } from 'authSlice';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './SignIn.scss';

const SignIn = () => {

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoggedIn } = useSelector(state => state.authInfo)


    useEffect(() => {
        if (isLoggedIn) {
            history.push('/dashboard')
        }
    }, [isLoggedIn])

    const handleButton = () => {
        dispatch(signUserIn({ email: email, password: password }))
        updateEmail('');
        updatePassword('');
    }

    const handleEmailChange = (e) => {

        updateEmail(e.target.value)
    }

    const hanldePasswordChange = e => {
        console.log(e.target.value)
        updatePassword(e.target.value)
    }

    return (
        <div>
            <input onChange={handleEmailChange} value={email} />
            <input onChange={hanldePasswordChange} value={password} />
            <button onClick={handleButton}>Submit</button>
        </div>
    )
}

export default SignIn