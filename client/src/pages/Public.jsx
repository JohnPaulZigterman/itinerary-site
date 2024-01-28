import { useQuery } from '@apollo/client';
import { QUERY_TRIPS_BY_CITY, QUERY_USERS } from '../utils/queries';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Public.css';

export default function Public() {
    // used useState to set the search term
    const [searchTerm, setSearchTerm] = useState('');
    // used useState to set the input value
    const [inputValue, setInputValue] = useState('');
    // used useQuery to get the trips by city
    const { loading: loadingTrips, error: errorTrips, data: dataTrips } = useQuery(QUERY_TRIPS_BY_CITY, {
        variables: { city: searchTerm },
        skip: !searchTerm,
    });
    // used useQuery to get all users
    const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useQuery(QUERY_USERS);

    const handleSearch = () => {
        // set the search term to the input value
        setSearchTerm(inputValue);
    };
    // if loadingTrips or loadingUsers is true, return loading
    if (loadingTrips || loadingUsers) return <p>Loading...</p>;
    // if errorTrips or errorUsers is true, return error
    if (errorTrips || errorUsers) return <p>Error :(</p>;

    return (
        <div>
            <div>
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
            <div>
                <h1 id='users-h1'>Users</h1>
                <div className='user-box'>
                {/*  return all users and sort them in alphabetical order */}
                {[...dataUsers.users].sort((a, b) => a.username.localeCompare(b.username)).map((user) => (
                    // link to the user page 
                    
                        <div className='user-card'>
                            <div className='user-card-header'>
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