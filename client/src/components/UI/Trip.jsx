// single trip card - used for home page and also for browsing friends' trips

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { NEW_DESTINATION } from '../../utils/mutations';
import { QUERY_ME, QUERY_TRIPS } from '../../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Auth from '../../utils/auth';

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';

export default function Trip({ city, startDate, endDate, tripId, existingDestinations }) {
    const [destinations, setDestinations] = useState(existingDestinations);
    const [location, setLocation] = useState('');
    const [when, setWhen] = useState('');

    console.log('18 existingDestinations:', existingDestinations);
    
    // get username
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
                    <button type='submit' id='scheduleButton'>ADD DESTINATION</button>
                </form>

                {/* should these locations be links??? links that open to the location on mapquest? */}
                <div className='destination-list'>
                    <h2>Trip Destinations</h2>
                    {destinations.map((destination, index) => (
                        <div key={index} className='single-destination'>
                            <p>{destination.location} @ {destination.when}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button>delete</button>
            <button>archive</button>
        </div>
    );
}