// displays user's trip cards

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Trip from '../components/UI/Trip';


// fetch trip dat?

export default function MyTrips() {
    // const [trips, setTrips] = useState([]);

    // useEffect(() => {
    //     // Fetch the trips data for the logged-in user and set it to the state
    //     // This is just a placeholder, you'll need to replace it with your actual data fetching logic
    //     fetchTripsForLoggedInUser().then(data => {
    //         setTrips(data);
    //     });
    // }, []);


    return (
        <div>
            <div className='all-trips'>
                {/* adjust <Trip /> so that it maps over all Trips? belonging to logged in user, see below*/}
                <Trip />
                <Trip />
                <Trip />
                <Trip />

                {/* {trips.map((trip) => (
                    <Trip key={trip._id} trip={trip} />
                ))} */}
            </div>
        </div>

    );
    
}