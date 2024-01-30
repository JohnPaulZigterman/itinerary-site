import { useQuery } from '@apollo/client';
import { QUERY_TRIPS_BY_CITY, QUERY_USERS, QUERY_ME } from '../utils/queries';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Public.css';

export default function Public() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');

    // ...

const { loading: loadingTrips, error: errorTrips, data: dataTrips, refetch: refetchTrips } = useQuery(QUERY_TRIPS_BY_CITY, {
    variables: { city: searchTerm },
    skip: !searchTerm,
});

const { loading: loadingUsers, error: errorUsers, data: dataUsers, refetch: refetchUsers } = useQuery(QUERY_USERS);

const { loading: loadingMe, error: errorMe, data: dataMe, refetch: refetchMe } = useQuery(QUERY_ME);

const handleSearch = () => {
    setSearchTerm(inputValue);
    refetchTrips(); // Refetch trips when search is triggered
    refetchUsers(); // Refetch users when search is triggered
    refetchMe(); // Refetch current user data when search is triggered
};

const handleUserClick = () => {
    refetchTrips(); // Refetch trips when a user is clicked
    refetchUsers(); // Refetch users when a user is clicked
    refetchMe(); // Refetch current user data when a user is clicked
};


    if (loadingTrips || loadingUsers || loadingMe) return <p>Loading...</p>;
    if (errorTrips || errorUsers || errorMe) return <p>Error :(</p>;

    

    return (
        <div className='public-page' onMouseOver={handleUserClick}>
            <div className='search-city'>
                <input
                    type="text"
                    placeholder="Search by city..."
                    // set the input value to the inputValue
                    value={inputValue}
                    // set the inputValue to the target value
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {/* when the button is clicked, run the handleSearch function */}
                <button onClick={handleSearch}>Search</button>
                {/* if there is a search term and dataTrips, return the trips in the city */}
                {searchTerm && dataTrips && (
                    <>
                        <h2>Trips in {searchTerm}:</h2>
                        <div className='all-trips'>
                        {/*  return the trips in the city */}
                        {dataTrips.tripsByCity.map((trip) => (
                            // link to the trip page
                            <Link key={trip._id} to={`/trip/${trip._id}`}>
                                <p>{trip.city}</p>
                            </Link>
                        ))}
                        </div>
                    </>
                )}
            </div>
            <div className='users-thumbnails'>
                <h1 id='users-h1'>Friends</h1>
                <div className='user-box'>
                {/*  return all friends and sort them in alphabetical order */}
                {[...dataMe.me.friends].sort((a, b) => a.username.localeCompare(b.username)).map((friend) => (
                    // link to the friend page 
                    <div className='user-thumbnail' key={friend.username}>
                        <div className='user-thumbnail-header'>
                        <h2>{friend.username}</h2>
                        </div>
                        <Link key={friend.username} to={`/user/${friend.username}`}>
                        <button>See Profile</button>
                        </Link>
                    </div>
                ))}
                </div>
            </div>
            <div className='users-thumbnails'>
                <h1 id='users-h1'>All Users</h1>
                <div className='user-box'>
                {/*  return all users and sort them in alphabetical order */}
                {[...dataUsers.users].sort((a, b) => a.username.localeCompare(b.username)).map((user) => (
                    // link to the user page 
                        <div className='user-thumbnail' key={user.username}>
                            <div className='user-thumbnail-header'>
                            <h2>{user.username}</h2>
                            </div>
                            <Link key={user.username} to={`/user/${user.username}`}>
                            <button>See Profile</button>
                            </Link>
                        </div>
                ))}
                </div>
            </div>
        </div>
    );
}