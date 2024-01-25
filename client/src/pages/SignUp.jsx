import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    // call useNavigate hook to redirect user to home page after successful signup
    const navigate = useNavigate();
    // set initial form state
    const [signupFormData, setSignupFormData] = useState({ username: '', email: '', password: '' });
    const [showSignupAlert, setSignupAlert] = useState(false);
    // use mutation hook to add new user to database
    const [newUser, { error: signupError }] = useMutation(NEW_USER);
    // if error, show alert
    useEffect(() => {
        if (signupError) {
            setSignupAlert(true);
        } else {
            setSignupAlert(false);
        }
        // it will only run if signupError changes
    }, [signupError]);
    // handle input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };
    // handle form submit
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const { data } = await newUser({
                variables: { ...signupFormData }
            });
            // if user have a token, log them in
            if (data && data.newUser && data.newUser.token) {
                Auth.login(data.newUser.token);
                navigate('/'); // Redirect to home page after successful signup
            } else {
                throw new Error('No token returned');
            }
        } catch (err) {
            console.error(err);
            setSignupAlert(true);
        }
        // clear form values
        setSignupFormData({ username: '', email: '', password: '' });
    };

    return (
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
    );
}