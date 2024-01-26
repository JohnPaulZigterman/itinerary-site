// single trip card - used for home page and also for browsing friends' trips

// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { NEW_DESTINATION } from '../utils/mutations';
// import { Link, useNavigate} from 'react-router-dom';

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';

export default function Trip({ city, startDate, endDate, destinations }) {

    // const [newDestination, { data, loading, error }] = useMutation(NEW_DESTINATION);

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    // }

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    // }

    return (
        <div className='trip-card'>
            {/* trip dates fetched from database */}
            <div className='trip-dates-header'>
                Trip to {city}
                    <br></br>
                {startDate} to {endDate}
            </div>

            <div className='trip-destinations'>
                {/* <form className='destination-form' onSubmit={handleFormSubmit}>
                    <p>Enter the name of your desired destination:</p>
                    <input type='text' id='new-destination' required onChange={handleInputChange} />
                </form> */}
                {/* should these locations be links??? links that open to the location on mapquest? */}
                <p>
                    <img src={pin} className='pin'/>
                    **location property of Destination from this Trip**
                </p>
                <p>
                    <img src={pin} className='pin'/>
                    **location property of Destination from this Trip**
                </p>
                <p>
                    <img src={pin} className='pin'/>
                    **location property of Destination from this Trip**
                </p>
            </div>

            <button>edit</button>
            <button>delete</button>
            <button>archive</button>
        </div>
    );
}