// displays one trip card

import React, { useEffect, useState,  } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Trip from '../components/UI/Trip';
import { QUERY_TRIP } from '../utils/queries'; 

export default function SingleTrip() {
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
        <div>
            <div className='single-trip'>

                {tripData && (
                    <Trip 
                        city={tripData.city}
                        startDate={tripData.start}
                        endDate={tripData.end}
                        // destinations={tripData.destinations.map(d => d.location)}
                    />
                )}
            </div>
        </div>

    );
    
}
