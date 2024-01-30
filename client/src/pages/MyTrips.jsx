import React from 'react';
import { useQuery } from '@apollo/client';
import Trip from '../components/UI/Trip';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

export default function MyTrips() {
    const loggedIn = Auth.loggedIn();

    if (!loggedIn) {
        return (
            <div>
                <h1>Please Log In To See Your Trips!</h1>
            </div>
        )
    }

    // fetch trip data through ME query
    const { loading, data } = useQuery(QUERY_ME);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const user = data?.me;
    const trips = user.trips || [];

    return (
        <div>
            <div className='all-trips'>
                {trips.map((trip) => (
                    <Trip
                        key={trip._id}
                        trip={trip}
                        showButtons={true}
                        hideMagnifyingGlass={true}
                    />
                ))}
            </div>
        </div>
    );
}