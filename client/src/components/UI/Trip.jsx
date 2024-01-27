// single trip card - used for home page, single page, and public page

// TODO list
    // configure edit trip CRUD functionality with UPDATE_TRIP mutation
    // configure edit destination CRUD functionality with UPDATE_DESTINATION mutation

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { NEW_DESTINATION, UPDATE_TRIP, DELETE_TRIP, UPDATE_DESTINATION, DELETE_DESTINATION } from '../../utils/mutations';
import { QUERY_ME, QUERY_USER, QUERY_TRIP } from '../../utils/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Auth from '../../utils/auth';

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';
// icon library: https://react-icons.github.io/react-icons/icons/fa6/
import { FaTrash, FaPlus, FaRegThumbsUp, FaRegThumbsDown, FaPen } from 'react-icons/fa';

export default function Trip({ trip, showButtons }) {
    const [destinations, setDestinations] = useState(trip.destinations);
    const [location, setLocation] = useState('');
    const [when, setWhen] = useState('');
    console.log('debug1:', trip.destinations)
    
    // get username
    const getProfile = Auth.getProfile();
    let username;
    if (getProfile && getProfile.data) {
        username = getProfile.data.username;
    } else {
        console.error('User profile data is not available');
    }

    const [deleteTrip] = useMutation(DELETE_TRIP, {
        // this refetch queries the trips again, so the deleted trip is removed from view
        refetchQueries: [
            { query: QUERY_USER, variables: { username } },
        ],
    });

    const [newDestination, { data, loading }] = useMutation(NEW_DESTINATION);
    const [deleteDestination] = useMutation(DELETE_DESTINATION);

    // // Code to write: UPDATE_TRIP and UPDATE_DESTINATION mutations
    // const [editTrip, { data, loading }] = useMutation(UPDATE_TRIP);
    // const [editDestination, { data, loading }] = useMutation(UPDATE_DESTINATION);

    // loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // add destination form     
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('debug2:', location, when)

        try {
            const { data } = await newDestination({
                variables: {
                    location: location,
                    when: when,
                    tripId: trip._id
                }
            });
            
            console.log('debug3:', data.newDestination)

            // using if else for more robust error handling
            if (data && data.newDestination) {

                setDestinations(prevDestinations => [...prevDestinations, data.newDestination]);
                console.log('debug4:', data.newDestination);             
                console.log('debug5:', destinations);
    
                setLocation('');
                setWhen('');
                
            } else {
                console.error('Failed to add destination.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEditTripButton = async (event) => {
        console.log("debug6: edit trip button pressed");
    }
    
    // INCOMPLETE: doesn't delete associated destinations
    const handleDeleteTripButton = async (event) => {
        console.log("deleting trip with trip id:", trip._id);

        // confirmation message
        if (!window.confirm("Are you sure you want to delete this trip?")) {
            return;
        }

        try {
            const { data } = await deleteTrip({
                variables: { _id: trip._id }
            });

            // using if else for more robust error handling
            if (data) {
                console.log('Trip deleted successfully.');
            } else {
                console.error('Failed to delete trip.');
            }
        } catch (error) {
            console.error('Delete trip error:', error);
        }

    }

    
    const handleEditDestinationButton = async (event) => {
        console.log("edit destination button pressed");
    }
    

    const handleDeleteDestinationButton = async (destinationId) => {
        console.log("deleting destination with id:", destinationId);

        try {
            const { data } = await deleteDestination({
                variables: { _id: destinationId }
            });

            // using if else for more robust error handling
            if (data) {
                setDestinations(destinations.filter(destination => destination._id !== destinationId));
                console.log('Destination deleted successfully.');
            } else {
                console.error('Failed to delete destination.');
            }
        } catch (error) {
            console.error('Delete destination error:', error);
        }

    }

    // FOR REFERENCE:
    // server-side resolvers.js:
        // updateTrip: async (parent, { _id, city, start, end }, context) => {
        //     if (context.user) {
        //         const updatedTrip = await Trip.findByIdAndUpdate(
        //             _id,
        //             { city, start, end },
        //             { new: true }
        //         );
        //         return updatedTrip;
        //     }
        //     throw AuthenticationError;
        // },

        // updateDestination: async (parent, { _id, location, when }, context) => {
        //     if (context.user) {
        //         const updatedDestination = await Destination.findByIdAndUpdate(
        //             _id,
        //             { location, start, end },
        //             { new: true }
        //         );
        //         return updatedDestination;
        //     }
        //     throw AuthenticationError;
        // },


    // client-side mutations.js:


    // server-side typeDefs.js:

        // type Trip {
        //     _id: ID!
        //     city: String!
        //     start: String!
        //     end: String!
        //     user: User
        //     destinations: [Destination]
        // }

        // type Destination {
        //     _id: ID!
        //     location: String!
        //     when: String
        // }

        // type Query {
        //     users: [User]
        //     user(username: String!): User
        //     trips(username: String!): [Trip]
        //     trip(_id: ID!): Trip
        //     destinations(trip: String!): [Destination]
        //     destination(_id: ID!): Destination
        //     me: User
        // }

        // type Mutation {
        //     newTrip(city: String!, start: String!, end: String!): Trip
        //     updateTrip(_id: ID!, city: String, start: String, end: String): Trip
        //     deleteTrip(_id: ID!): Trip

        //     newDestination(tripId: ID!, location: String!, when: String): Destination
        //     updateDestination(_id: ID!, location: String, when: String): Destination
        //     deleteDestination(_id: ID!): Destination
        // }

    return (
        <div className='trip-card'>
            <div className='trip-dates-header'>
                <Link to={`/trip/${trip._id}`}>Itinerary for {trip.city} </Link>
                    <br></br>
                {trip.start} to {trip.end}
            </div>

            <div className='trip-destinations'>
                <form className='destination-form' onSubmit={handleFormSubmit}>
                    <p>Enter the destination to add to your itinerary:</p>
                    <input 
                        type='text' 
                        id='location' 
                        placeholder='location' 
                        required value={location} 
                        onChange={(event) => setLocation(event.target.value)} />
                    <input 
                        type='text' 
                        // text/time/date - each has pros/cons
                        id='when' 
                        placeholder='note the time or date for this destination' 
                        value={when} 
                        onChange={(event) => setWhen(event.target.value)} />
                    <button type='submit'><FaPlus /></button>
                </form>

                {/* EXTRA TODO: use locations to query map API and open the mapquest or google maps page */}
                <div className='destination-list'>
                    <h2>Trip Destinations</h2>
                    {destinations.map((destination) => (
                        <div key={destination._id} className='single-destination'>

                            <p>{destination.location}{destination.when ? ` @ ${destination.when}` : ''}</p>

                            <div className='icons'>
                                <button onClick={handleEditDestinationButton}><FaPen /></button> 
                                <button onClick={() => handleDeleteDestinationButton(destination._id)}><FaTrash/></button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            
            {/* showButtons=true should be passed to this component to render these buttons. */}
            {showButtons && (
                <div>
                    <button className='edit-trip' onClick={handleEditTripButton}><FaPen /> Edit Trip</button>
                    <button className='delete-trip' onClick={() => handleDeleteTripButton(trip.trip_id)}><FaTrash /> Delete Trip</button>
                </div>
            )}

        </div>
    );
}