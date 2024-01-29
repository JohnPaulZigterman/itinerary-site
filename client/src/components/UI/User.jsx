import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/User.css';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FRIEND, DELETE_FRIEND } from '../../utils/mutations';
import { QUERY_IS_FRIEND_WITH } from '../../utils/queries';
import Auth from '../../utils/auth';

export default function User({ username, trips, _id }) {
    const getProfile = Auth.getProfile();
    let browserId;
    if (getProfile && getProfile.data) {
        browserId = getProfile.data._id;
    } else {
        console.error('User profile data is not available');
    }
    // used useQuery to get the isFriendWith data refetch to update the data
    const { loading, data, refetch } = useQuery(QUERY_IS_FRIEND_WITH, {
        variables: { userId: browserId, friendId: _id },
    });
    // used useMutation to add and delete friend data refetch to update the data
    const [addFriend] = useMutation(ADD_FRIEND, {
        onCompleted: () => refetch(),
    });
    const [deleteFriend] = useMutation(DELETE_FRIEND, {
        onCompleted: () => refetch(),
    });

    const handleAddFriendButton = async (event) => {
        try {
            // add friend using the userId and friendId
            await addFriend({
                variables: { userId: browserId, friendId: _id },
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveFriendButton = async (event) => {
        try {
            // delete friend using the userId and friendId
            await deleteFriend({
                variables: { userId: browserId, friendId: _id },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='user-card'>
            <div className='user-card-header'>
                <h3>{username}'s Profile</h3>
                {loading ? (
                    <p>Loading...</p>
                    // if the user is the same as the browserId, then the user can't add or remove friend
                ) : browserId === _id ? null : data.isFriendWith ? (
                    // if the user is already a friend, then the user can remove friend
                    <button className='friend-button' onClick={handleRemoveFriendButton}>Remove Friend</button>
                    // if the user is not a friend, then the user can add friend
                ) : (
                    <button className='friend-button' onClick={handleAddFriendButton}>Add Friend</button>
                )}
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