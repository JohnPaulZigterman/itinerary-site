// displays one trip card

import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Trip from '../components/UI/Trip';
import { QUERY_TRIP } from '../utils/queries'; 

export default function SingleTrip() {
    // tripId can be pulled through other methods
    let { tripId } = useParams()
    console.log(tripId)

    const { loading, data } = useQuery(QUERY_TRIP, {
        variables: { id: tripId },
    });
    console.log(data) 

    const tripData = data?.trip;
    console.log(tripData)

    if (loading) {
        
        return <div>Loading...</div>;
    }

return (
        <div className='single-trip'>
            <Trip 
                key={tripId}
                trip={tripData}
                showButtons={true}
                hideMagnifyingGlass={true}

            />
        </div>
    );
    
}
