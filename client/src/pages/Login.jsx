// log in and signup
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {

    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [loginValidated] = useState(false); // is login validated ?? not integrated
    const [showLoginAlert, setLoginAlert] = useState(false); // for error alerts

    const [signupFormData, setSignupFormData] = useState({ username: '', email: '', password: '' });
    const [signupValidated] = useState(false); // is signup validated ?? not integrated
    const [showSignupAlert, setSignupAlert] = useState(false); // for error alerts

    const [addUser, { error: signupError }] = useMutation(ADD_USER);
    const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);

    // error handling alerts
    useEffect(() => {
        if (signupError) {
            setSignupAlert(true);
        } else {
            setSignupAlert(false);
        }

        if (loginError) {
            setLoginAlert(true);
        } else {
            setLoginAlert(false);
        }
    }, [signupError, loginError]);


    // handles input change for both forms
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (event.target.form.id === 'login-form') {
            setLoginFormData({ ...loginFormData, [name]: value });
        } else if (event.target.form.id === 'signup-form') {
            setSignupFormData({ ...signupFormData, [name]: value });
        }
    };

    // handles login submission
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({
                variables: { ...loginFormData }
            });
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            setLoginAlert(true);
        }
        setLoginFormData({ email: '', password: '' });
    };

    // handles signup submission
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...signupFormData }
            });
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
            setSignupAlert(true);
        }
        setSignupFormData({ username: '', email: '', password: '' });
    };


    return (
        <div className='login-signup-container'>

            <div className='login-container'>
                <h2>Login</h2>
                <form id="login-form" onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="email@email.com" value={loginFormData.email} onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder="password" value={loginFormData.password} onChange={handleInputChange}/>
                    <button type="submit">Login</button>
                    {showLoginAlert && <div className="alert">Login failed</div>}
                </form>
            </div>

            <div className='signup-container'>
                <h2>New Users</h2>
                <form id="signup-form" onSubmit={handleSignup}>
                    <input type="text" name="username" placeholder="username" value={signupFormData.username} onChange={handleInputChange}/>
                    <input type="email" name="email" placeholder="email" value={signupFormData.email} onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder="password" value={signupFormData.password} onChange={handleInputChange}/>
                    <button type="submit">Sign Up</button>
                    {showSignupAlert && <div className="alert">Signup failed</div>}
                </form>
            </div>
        </div>
    );
}