import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_TRIP } from '../utils/mutations';
import { Link, useNavigate} from 'react-router-dom';
import Auth from '../utils/auth';

import '../styles/TripPlanner.css';

export default function PlanTrip() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        city: '',
        start: '',
        end: ''
    });

    const [newTrip, { data, loading, error }] = useMutation(NEW_TRIP);

    // get username
    const getProfile = Auth.getProfile();
    let username;
    if (getProfile && getProfile.data) {
        username = getProfile.data.username;
        console.log('Username:', username);
        console.log('Profile:', getProfile)
    } else {
        console.error('User profile data is not available');
    }

    // handles form field changes
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    // handles form submission - need to pass username
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        try {
            const { data } = await newTrip({
                variables: {
                    city: formData.city,
                    start: formData.start,
                    end: formData.end,
                    user: username
                }
            });
            
            if (data.newTrip) {
                console.log('Trip added successfully.', data.newTrip);
                navigate(`/trip/${data.newTrip._id}`); 
            } else {
                console.error('Failed to add trip.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='trip-planner'>

            <h2>PLANNING TOOL</h2>
            <form className='trip-planner-form' onSubmit={handleFormSubmit}>
                <p>Select the start date of your trip:</p>
                <input type='date' id='start' required onChange={handleInputChange} />

                <p>Select the end date of your trip:</p>
                <input type='date' id='end' required onChange={handleInputChange} />

                <p>Enter the primary location of your trip:</p>
                <input type='text' id='city' placeholder='Where are you going?' required onChange={handleInputChange} />
                
                <button type='submit' id='scheduleButton'>CREATE NEW TRIP</button>
                {/* when the form is submitted, i want to navigate the user to /trip/:tripId using the tripId that was just created */}
            </form>

            {/* Display loading or error messages if necessary */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

        </div>
    );
}