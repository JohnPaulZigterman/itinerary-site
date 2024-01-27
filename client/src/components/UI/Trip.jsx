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
import { FaTrash, FaPlus, FaRegThumbsUp, FaRegThumbsDown, FaPen, FaMagnifyingGlass, FaRegFloppyDisk } from 'react-icons/fa6';

export default function Trip({ trip, showButtons, hideMagnifyingGlass }) {
    const [destinations, setDestinations] = useState(trip.destinations);
    const [location, setLocation] = useState('');
    const [when, setWhen] = useState('');
    console.log('debug1:', trip.destinations)

    // state variables for editing Trip & Destination
    const [tripEditMode, setTripEditMode] = useState(false);
        // update these states in edit mode, also need to be used in the HTML
        const [editableCity, setEditableCity] = useState(trip.city);
        const [editableStart, setEditableStart] = useState(trip.start);
        const [editableEnd, setEditableEnd] = useState(trip.end);

    const [destinationEditModes, setDestinationEditModes] = useState({});
        // destinationEditModes
        // keys: destination IDs, values: boolean flags
        console.log('destinationEditModes:', destinationEditModes)

        const [editableDestinations, setEditableDestinations] = useState({}); // update state to new values during edit, also need to be used in the HTML
            // editableDestinations
            // keys: destination IDs, values: objects containing location and when
            console.log('editableDestinations:', editableDestinations)

    
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
        // is there a better way to do this?!?!?!
        refetchQueries: [
            { query: QUERY_USER, variables: { username } },
        ],
    });
    
    const [newDestination, { data, loading }] = useMutation(NEW_DESTINATION);
    const [deleteDestination] = useMutation(DELETE_DESTINATION);

    // // Code to write: UPDATE_TRIP and UPDATE_DESTINATION mutations
    // const [editTrip] = useMutation(UPDATE_TRIP);
    // const [editDestination] = useMutation(UPDATE_DESTINATION);

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
        console.log('debug6: edit trip button pressed');
        setTripEditMode(true);
    }

    const handleSaveTripButton = async () => {
        setTripEditMode(false)
        // logic to use UPDATE_TRIP mutation
    }
    
    // INCOMPLETE: doesn't delete associated destinations, 
    // also need to refresh parent component to reflect deleted trip
    const handleDeleteTripButton = async (event) => {
        console.log('deleting trip with trip id:', trip._id);

        // confirmation message
        if (!window.confirm('Are you sure you want to delete this trip?')) {
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
    
    const handleEditDestinationButton = async (destinationId) => {
        console.log('edit destination button pressed');

        const currentDestinationEditMode = destinationEditModes[destinationId]; // checks the boolean flag for edit mode status particular destination
        console.log(destinationId, ':', currentDestinationEditMode) 

        setDestinationEditModes({ ...destinationEditModes, [destinationId]: true }); // sets edit mode of destination to true
    }

    // INCOMPLETE
    const handleSaveDestinationButton = async (destinationId) => {
        // turn off edit mode
        setDestinationEditModes({ ...destinationEditModes, [destinationId]: false });
        // logic to use UPDATE_DESTINATION mutation
        
    }


    const handleDeleteDestinationButton = async (destinationId) => {
        console.log('deleting destination with id:', destinationId);

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
            <div className='trip-card-header'>
                <h2>Itinerary</h2>
                <div className='trip-details'>
                    <div className='left detail-values'>
                        {tripEditMode ? (
                            <>
                                {/* values will have to be changed!!!! */}
                                <p><strong>Destination: </strong><input type="text" value={trip.city} /></p>
                                <p>
                                    <strong>Duration: </strong>
                                    <input type="date" value={trip.start} />
                                    <input type="date" value={trip.end} />
                                </p>
                            </>
                        ) : (
                            <>
                                <p><strong>Destination: </strong>{trip.city}</p>
                                <p><strong>Duration: </strong>{trip.start} to {trip.end}</p>
                            </>
                        )}

                    </div>
                    
                    {/* this div holds icon that links to the single trip view, hide on SingleTrips page */}
                    {!hideMagnifyingGlass && (
                        <div className='right edit-delete'>
                            <Link to={`/trip/${trip._id}`}><FaMagnifyingGlass /></Link>
                        </div>
                    )}
                    
                    {/* clicking this button should send the new info to the db to update the trip and also turn off editing mode */}
                    {tripEditMode && (
                        <div className='icons'>
                            <button onClick={handleSaveTripButton}><FaRegFloppyDisk /></button>
                        </div>
                    )}
                </div>
            </div>  

            <div className='trip-destinations'>
                <form className='destination-form' onSubmit={handleFormSubmit}>
                    <p>Enter a destination to add to your itinerary:</p>
                    <input 
                        type='text' 
                        id='location' 
                        placeholder='location' 
                        required value={location} 
                        onChange={(event) => setLocation(event.target.value)} />
                    <input 
                        // which type to use?? text/time/date - each has pros/cons
                        type='text' 
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
                            {/* values will have to be changed!!!! */}
                            {destinationEditModes[destination._id] 
                            ? (
                                <>
                                    <input type='text' value={editableDestinations[destination._id]?.location} />
                                    <input type='text' value={editableDestinations[destination._id]?.when} />
                                    
                                    <div className='icons'>
                                        <button onClick={() => handleSaveDestinationButton(destination._id)}><FaRegFloppyDisk /></button>
                                    </div>
                                </>
                            ) 
                            : (
                                <>
                                    <p>{destination.location}{destination.when ? ` @ ${destination.when}` : ''}</p>
                                    <div className='icons'>
                                        <button onClick={() => handleEditDestinationButton(destination._id)}><FaPen /></button>
                                        <button onClick={() => handleDeleteDestinationButton(destination._id)}><FaTrash/></button>
                                    </div>
                                </>
                            )}
                            
                        </div>
                    ))}

                </div>
            </div>
            
            {/* showButtons=true should be passed to this component to render these buttons. */}
            {/* on the single page view... 
            there also has to be some kind of logic to check if the post belongs to the visitor
            otherwise, the buttons should NOT be shown. */}
            {showButtons && (
                <div>
                    <button className='edit-trip' onClick={handleEditTripButton}><FaPen /> Edit Trip</button>
                    <button className='delete-trip' onClick={() => handleDeleteTripButton(trip.trip_id)}><FaTrash /> Delete Trip</button>
                </div>
            )}

        </div>
    );
}