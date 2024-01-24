import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [showLoginAlert, setLoginAlert] = useState(false);

    const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);

    useEffect(() => {
        if (loginError) {
            setLoginAlert(true);
        } else {
            setLoginAlert(false);
        }
    }, [loginError]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({
                variables: { ...loginFormData }
            });
            if (data.login.token) {
                Auth.login(data.login.token);
                console.log('logged in');
            } else {
                throw new Error('No token returned');
            }
        } catch (err) {
            console.error(err);
            setLoginAlert(true);
        }
        setLoginFormData({ email: '', password: '' });
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="email@email.com" value={loginFormData.email} onChange={handleInputChange}/>
                <input type="password" name="password" placeholder="password" value={loginFormData.password} onChange={handleInputChange}/>
                <button type="submit">Login</button>
                {showLoginAlert && <div className="alert">Login failed</div>}
            </form>
            <Link to="/SignUp">Don't have an account? Sign Up</Link>
        </div>
    );
}