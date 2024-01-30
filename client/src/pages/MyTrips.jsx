import React from 'react';
import { useQuery } from '@apollo/client';
import Trip from '../components/UI/Trip';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

export default function MyTrips() {

    const getProfile = Auth.getProfile();
    let username;
    if (getProfile && getProfile.data) {
        username = getProfile.data.username;
        console.log('Username:', username);
        console.log('Profile:', getProfile)
    } else {
        console.error('User profile data is not available');
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