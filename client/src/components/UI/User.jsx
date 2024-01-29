import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/User.css';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import Auth from '../../utils/auth';
import '../../styles/User.css'

export default function User({ username, trips, _id }) {
    const getProfile = Auth.getProfile();
    let browserId;
    if (getProfile && getProfile.data) {
        browserId = getProfile.data._id;
    } else {
        console.error('User profile data is not available');
    }
    const [addFriend] = useMutation(ADD_FRIEND);
    const handleAddFriendButton = async (event) => {

        try {
            const { data } = await addFriend({
                variables: { userId: browserId, friendId: _id }
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <div className='user-card'>
            <div className='user-card-header'>
                <h2>{username}'s Trips</h2>
                <button className='friend-button' onClick={handleAddFriendButton}>Add Friend</button>
            </div>
            <div className='all-users-trips'>
                {trips.map((trip) => (
                    <div className='trips-list'>
                        <Link key={trip._id} to={`/trip/${trip._id}`}>
                            <p>{trip.city}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}