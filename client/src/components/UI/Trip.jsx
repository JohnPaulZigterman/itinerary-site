// single trip card - used for home page and also for browsing friends' trips

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';

export default function Trip() {
    return (
        <div className='trip-card'>
            {/* trip dates fetched from database */}
            <div className='trip-dates-header'>
                **start date
                <br></br>
                to 
                <br></br>
                **end date
            </div>

            <div className='trip-destinations'>
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


// Dates will have to be generated dynamically
// Day divs should also be generated dynamically
// p elements (locations, reservations, etc) also need to ge generated dynamically
// guessing ... will utilize map function?