// single trip card - used for home page, single page, and public page
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { NEW_DESTINATION, UPDATE_TRIP, DELETE_TRIP, UPDATE_DESTINATION, DELETE_DESTINATION } from '../../utils/mutations';
import { QUERY_ME, QUERY_USER, QUERY_TRIP } from '../../utils/queries';

import Auth from '../../utils/auth';

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';
// icon library: https://react-icons.github.io/react-icons/icons/fa6/
import { FaTrash, FaPlus, FaRegThumbsUp, FaRegThumbsDown, FaPen, FaMagnifyingGlass, FaFloppyDisk  } from 'react-icons/fa6';

export default function Trip({ trip, showButtons, hideMagnifyingGlass }) {
    // ---------- State Variables ----------------------------------------------------------------
    // state variables for adding Destination
    const [destinations, setDestinations] = useState(trip.destinations);
    const [location, setLocation] = useState('');
    const [when, setWhen] = useState('');

    // state variables for editing Trip
    const [tripEditMode, setTripEditMode] = useState(false);
        // update these states in edit mode, also need to be used in the HTML
        const [editableCity, setEditableCity] = useState(trip.city);
        const [editableStart, setEditableStart] = useState(trip.start);
        const [editableEnd, setEditableEnd] = useState(trip.end);

    // state variables for editing Destinations
    // becca-comment: COMMENTS EXPLAINING BOTH STATE VARIABLES IN DEPTH
    const [destinationEditModes, setDestinationEditModes] = useState({});
        // destinationEditModes
        // keys: destination IDs, values: boolean flags

    const [editableDestinations, setEditableDestinations] = useState({}); // update state to new values during edit, also need to be used in the HTML
        // editableDestinations
        // keys: destination IDs, values: objects containing location and when
    // -------------------------------------------------------------------------------------------

    // get username
    const getProfile = Auth.getProfile();
    let username;
    if (getProfile && getProfile.data) {
        username = getProfile.data.username;
    } else {
        console.error('User profile data is not available');
    }

    // ---------- Mutations ----------------------------------------------------------------------
    const [deleteTrip] = useMutation(DELETE_TRIP, {
        // this refetch queries the trips again, so the deleted trip is removed from view
        // is there a better way to do this?!?!?!
        refetchQueries: [
            { query: QUERY_USER, variables: { username } },
        ],
    });
    
    const [newDestination, { data, loading }] = useMutation(NEW_DESTINATION);
    const [deleteDestination] = useMutation(DELETE_DESTINATION);

    const [editTrip] = useMutation(UPDATE_TRIP);
    const [editDestination] = useMutation(UPDATE_DESTINATION);

    // loading message
    if (loading) {
        return <div>Loading...</div>;
    }
    // -------------------------------------------------------------------------------------------

    // ---------- add destination form -----------------------------------------------------------    
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

            // using if else for more robust error handling
            if (data && data.newDestination) {
                setDestinations(prevDestinations => [...prevDestinations, data.newDestination]);
                setLocation('');
                setWhen('');
                
            } else {
                console.error('Failed to add destination.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // -------------------------------------------------------------------------------------------
    

    // ---------- edit/delete trip functionality  ------------------------------------------------
    const handleEditTripButton = async (event) => {
        setTripEditMode(true);
    }

    const handleSaveTripButton = async () => {
        try {
            const { data } = await editTrip({
                variables: {
                    _id: trip._id,
                    city: editableCity,
                    start: editableStart,
                    end: editableEnd,
                },
            });

            if (data) {
                console.log('Trip updated successfully.');
            } else {
                console.error('Failed to update trip.');
            }
        } catch (error) {
            console.error('Update trip error:', error);
        }

        setTripEditMode(false);
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
    // -------------------------------------------------------------------------------------------

    // ---------- edit destinations functionality  -----------------------------------------------
    // updates editable values of a specific destination
    // becca-comment: COMMENT FOLLOWING FUNCTION IN DEPTH, LINE BY LINE. 
    const setEditableDestinationValue = (destinationId, field, value) => {
        setEditableDestinations(prevEditableDestinations => ({
            ...prevEditableDestinations,
            [destinationId]: {
                ...prevEditableDestinations[destinationId],
                [field]: value,
            },
        }));
    };

    // edit destination button clicked: turn on edit mode and initialize editableDestinations state 
    const handleEditDestinationButton = async (destinationId) => {
        console.log('edit destination button pressed');

        const destinationToEdit = destinations.find(d => d._id === destinationId);
        setEditableDestinations({
            ...editableDestinations,
            [destinationId]: { location: destinationToEdit.location, when: destinationToEdit.when }
        });

        setDestinationEditModes({ ...destinationEditModes, [destinationId]: true }); 
        console.log(destinationId)
        console.log(destinationEditModes)
    }


    // save button clicked: update destination in local state and then use mutation to update in db 
    // then exit edit mode 
    const handleSaveDestinationButton = async (destinationId) => {
        const updatedDestination = editableDestinations[destinationId];
        if (updatedDestination) {
            try {
                const { data } = await editDestination({
                    variables: {
                        _id: destinationId,
                        location: updatedDestination.location,
                        when: updatedDestination.when
                    }
                });
                
                // using if else for more robust error handling
                if (data) {
                    setDestinations(destinations.map(destination => 
                        destination._id === destinationId ? { ...destination, ...updatedDestination } : destination
                    ));
                    setDestinationEditModes({ ...destinationEditModes, [destinationId]: false });
                    console.log('Destination updated successfully.');
                } else {
                    console.error('Failed to update destination.');
                }
            } catch (error) {
                console.error('Update destination error:', error);
            }
        } else {
            console.error('Updated destination details not found');
        }
    };
    // -------------------------------------------------------------------------------------------

    // ---------- delete destinations functionality  ---------------------------------------------
    // use mutation to delete from db and then update state 
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
    // -------------------------------------------------------------------------------------------

    // ---------- rendered component  ------------------------------------------------------------
    return (
        <div className='trip-card'>
            <div className='trip-card-header'>
                <h2>Itinerary</h2>
                <div className='trip-details'>
                    <div className='left detail-values'>
                        {tripEditMode ? (
                            <> 
                                <p><strong>Destination: </strong><input type="text" value={editableCity} onChange={(e) => setEditableCity(e.target.value)} /></p>
                                <p>
                                    <strong>Duration: </strong>
                                    <input type="date" value={editableStart} onChange={(e) => setEditableStart(e.target.value)} />
                                    <input type="date" value={editableEnd} onChange={(e) => setEditableEnd(e.target.value)} />
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
                    
                    {tripEditMode && (
                        <div className='icons'>
                            <button onClick={handleSaveTripButton}><FaFloppyDisk /></button>
                        </div>
                    )}
                </div>
            </div>  

            <div className='trip-destinations'>
            {showButtons && (
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
            )}

                {/* EXTRA TODO: use locations to query map API and open the mapquest or google maps page */}
                <div className='destination-list'>
                    <h2>Trip Destinations</h2>
                    
                    {destinations.length > 0 ? (
                        destinations.map((destination) => (
                            <div key={destination._id} className='single-destination'>
                                {destinationEditModes[destination._id] 
                                ? (
                                    <>  <div className='destination-details'>
                                                                              
                                            <input 
                                                type='text' 
                                                value={editableDestinations[destination._id]?.location}
                                                onChange={(event) => setEditableDestinationValue(destination._id, 'location', event.target.value)}
                                            />
                                            
                                            <input 
                                                type='text' 
                                                value={editableDestinations[destination._id]?.when}
                                                onChange={(event) => setEditableDestinationValue(destination._id, 'when', event.target.value)}
                                            />
                                        </div>  
                                            
                                            <div className='icons'>
                                                <button onClick={() => handleSaveDestinationButton(destination._id)}><FaFloppyDisk /></button>
                                            </div>

                                        
                                    </>
                                ) 
                                : (
                                    <>
                                        <div className='destination-details'>
                                            <p><strong>{destination.location}</strong></p>
                                            <p  style={{ marginTop: '5px', fontSize: '.8em' }}>{destination.when ? <>{destination.when}</> : ''}</p>
                                        </div>
                                        <div className='icons'>
                                            <button onClick={() => handleEditDestinationButton(destination._id)}><FaPen /></button>
                                            <button onClick={() => handleDeleteDestinationButton(destination._id)}><FaTrash/></button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        !hideMagnifyingGlass && (
                            <div className='no-destinations-message'>
                                <p>You have no destinations!</p>
                                <p>Click the magnifying glass in the top left to add your first destination to this trip.</p>

                            </div>
                        )
                    )}
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