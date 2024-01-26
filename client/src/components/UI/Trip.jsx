// single trip card - used for home page and also for browsing friends' trips

// TODO list
// DONE import an icon library - need thumbs up/down, trashcan, pen...
// DONE change Destination divs to have a delete and edit icon and 
    // configure CRUD functionality
// delete icon will use DELETE_TRIP mutation, pen icon will use UPDATE_DESTINATION mutation
// DONE add a delete button to trip - 
    // configure CRUD and also add a confirmation alert

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { NEW_DESTINATION, UPDATE_TRIP, DELETE_TRIP, UPDATE_DESTINATION, DELETE_DESTINATION } from '../../utils/mutations';
import { QUERY_ME, QUERY_TRIPS } from '../../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Auth from '../../utils/auth';

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';

// icon library: https://react-icons.github.io/react-icons/icons/fa6/
import { FaTrash, FaPlus, FaRegThumbsUp, FaRegThumbsDown, FaPen } from 'react-icons/fa';

export default function Trip({ city, startDate, endDate, tripId, existingDestinations }) {
    const [destinations, setDestinations] = useState(existingDestinations);
    const [location, setLocation] = useState('');
    const [when, setWhen] = useState('');

    console.log('18 existingDestinations:', existingDestinations);
    
    // get username -- is this being used anywhere? do i 
    const getProfile = Auth.getProfile();
    let username;
    if (getProfile && getProfile.data) {
        username = getProfile.data.username;
    } else {
        console.error('User profile data is not available');
    }

    const [newDestination, { data, loading }] = useMutation(NEW_DESTINATION);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('40:', location, when)

        try {
            const { data } = await newDestination({
                variables: {
                    location: location,
                    when: when,
                    tripId: tripId
                }
            });
            
            console.log('51:', data.newDestination)
            
            if (data && data.newDestination) {

                setDestinations(prevDestinations => [...prevDestinations, data.newDestination]);
                console.log('56 Destination added successfully.', data.newDestination);             
                console.log('59 destinations:', destinations);
    
                setLocation('');
                setWhen('');
                
            } else {
                console.error('Failed to add destination.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='trip-card'>
            <div className='trip-dates-header'>
                <Link to={`/trip/${tripId}`}>Itinerary for {city} </Link>
                    <br></br>
                {startDate} to {endDate}
            </div>

            <div className='trip-destinations'>
                <form className='destination-form' onSubmit={handleFormSubmit}>
                    <p>Enter the destination to add to your itinerary:</p>
                    <input type='text' id='location' placeholder='location' required value={location} onChange={(event) => setLocation(event.target.value)} />
                    <input type='text' id='when' placeholder='add time or date for this destination' value={when} onChange={(event) => setWhen(event.target.value)} />
                    <button type='submit'><FaPlus /></button>
                </form>

                {/* should these locations be links??? links that open to the location on mapquest? */}
                <div className='destination-list'>
                    <h2>Trip Destinations</h2>
                    {destinations.map((destination, index) => (
                        <div key={index} className='single-destination'>
                            <p>{destination.location} @ {destination.when}</p>
                            <div className='icons'>
                                <button><FaPen /></button> 
                                <button><FaTrash/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className='edit-trip'><FaPen /> Edit Trip</button>
            <button className='delete-trip'><FaTrash /> Delete Trip</button>
            <h3><FaTrash /> <FaPlus /> <FaRegThumbsUp /> <FaRegThumbsDown /> <FaPen /></h3>


        </div>
    );
}