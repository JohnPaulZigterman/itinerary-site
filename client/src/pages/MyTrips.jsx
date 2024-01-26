// displays user's trip cards

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Trip from '../components/UI/Trip';
import { QUERY_USER , QUERY_TRIPS } from '../utils/queries';
import Auth from '../utils/auth';


export default function MyTrips() {
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

    // fetch trip data through User query
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username },
    });
    console.log(data) // the query is not working bc the data has an empty trips array...

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const user = data?.user;
    const trips = user.trips || [];

    return (
        <div>
            <div className='all-trips'>
                {trips.map((trip) => (
                    <Trip
                        key={trip._id}
                        tripId={trip._id}
                        city={trip.city}
                        startDate={trip.start}
                        endDate={trip.end}
                        existingDestinations={trip.destinations}
                    />
                ))}
            </div>
        </div>

    );
    
}