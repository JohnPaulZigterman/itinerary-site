import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/User.css';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';

export default function User({ username, trips }) {
    return (

        <div className='user-card'>
            <div className='user-card-header'>
                <h3>{username}'s Profile</h3>
                <button className='friend-button'>Add Friend</button>
            </div>
            <div className='all-trips'>
                {trips.map((trip) => (
                    <div className='trip-card'>
                        <Link key={trip._id} to={`/trip/${trip._id}`}>
                            <p>{trip.city}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}