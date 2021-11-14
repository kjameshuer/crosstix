import React, { useState } from 'react';
import { signUserIn } from 'authSlice';
import { useDispatch } from 'react-redux';
import './SignIn.scss';

const SignIn = () => {

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const dispatch = useDispatch();

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