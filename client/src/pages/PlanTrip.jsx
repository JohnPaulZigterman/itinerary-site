// form for creating a trip
// is this all we want on this page? and then once the trip dates/location are set, should route user to another
// page to fill out the dates?

import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { NEW_TRIP } from '../utils/mutations';

import '../styles/TripPlanner.css';

export default function PlanTrip() {
    const [formData, setFormData] = useState({
        city: '',
        when: ''
    });

    const [addTrip, { data, loading, error }] = useMutation(NEW_TRIP);

    // form field changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addTrip({
                variables: {
                    city: formData.city,
                    when: formData.when
                }
            });
            if (response.data) {
                console.log('Trip added successfully', response.data.newTrip);
            } else {
                console.error('Failed to add trip');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='trip-planner'>

            <div>Planning Tool</div>

            <form onSubmit={handleFormSubmit}>
                <p>Enter the date of your trip:</p>
                <input type="date" id="when" required onChange={handleInputChange} />

                <p>Enter the trip location:</p>
                <input type="text" id="city" placeholder="Where are you going?" required onChange={handleInputChange} />
                
                <button type="submit" id="scheduleButton">Map Your Days!</button>
            </form>

            {/* Display loading or error messages if necessary */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}


        </div>
    );
}