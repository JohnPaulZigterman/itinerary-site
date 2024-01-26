import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_USER, LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Login() {
    // call useNavigate hook to redirect user to home page after successful signup
    const navigate = useNavigate();

        // set initial form state
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [showLoginAlert, setLoginAlert] = useState(false);

    const [signupFormData, setSignupFormData] = useState({ username: '', email: '', password: '' });
    const [showSignupAlert, setSignupAlert] = useState(false);

    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [signupErrorMessage, setSignupErrorMessage] = useState('');

    const [loginValidated] = useState(false); // not integrated
    const [signupValidated] = useState(false); //  not integrated

    const [newUser, { error: signupError }] = useMutation(NEW_USER);
    const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (event.target.form.id === 'login-form') {
            setLoginFormData({ ...loginFormData, [name]: value });
        } else if (event.target.form.id === 'signup-form') {
            setSignupFormData({ ...signupFormData, [name]: value });
        }
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
            // set specific error messages - - needs debugging! the if condition is wrong
            if (err.message.includes('User not found')) {
                setLoginErrorMessage('User not found.');
            } else if (err.message.includes('Incorrect password')) {
                setLoginErrorMessage('Incorrect password.');
            } else {
                setLoginErrorMessage('Login failed.');
            }
        }
        setLoginFormData({ email: '', password: '' });
    };

    
    // handles signup submission
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const { data } = await newUser({
                variables: { ...signupFormData }
            });
            // if user has a token, log them in
            if (data && data.newUser && data.newUser.token) {
                Auth.login(data.newUser.token);
                navigate('/'); // redirect to home page after successful signup
            } else {
                throw new Error('No token returned');
            }
        } catch (err) {
            console.error(err);
            setSignupAlert(true);
            // set specific error message - needs debugging! the if condition is wrong
            if (err.message.includes('User already exists')) {
                setSignupErrorMessage('User already exists.');
            } else {
                setSignupErrorMessage('Signup failed.');
            }
        }
        // clear form values
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
                    {showLoginAlert && <div className="alert">{loginErrorMessage}</div>}
                </form>
            </div>

            <div className='signup-container'>
                <h2>New Users</h2>
                <form id="signup-form" onSubmit={handleSignup}>
                    <input type="text" name="username" placeholder="username" value={signupFormData.username} onChange={handleInputChange}/>
                    <input type="email" name="email" placeholder="email" value={signupFormData.email} onChange={handleInputChange}/>
                    <input type="password" name="password" placeholder="password" value={signupFormData.password} onChange={handleInputChange}/>
                    <button type="submit">Sign Up</button>
                    {showSignupAlert && <div className="alert">{signupErrorMessage}</div>}
                </form>
            </div>

        </div>
    );
}