import React from 'react';
import { Link } from 'react-router-dom';

export default function User({ username, trips }) {
    return (

        <div className='trip-card'>
            <div className='trip-info'>
                <h3>{username}</h3>
            </div>
            <div className='all-trips'>
                {trips.map((trip) => (
                    <Link key={trip._id} to={`/trip/${trip._id}`}>
                        <p>{trip.city}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}