// single trip card - used for home page and also for browsing friends' trips

import '../../styles/Trips.css';
import pin from '../../assets/pin.png';

export default function Trip() {
    return (
        <div className='trip-card'>

            <div className='trip-dates-header'>
                Mon, Jan 15, 2023 
                <br></br>
                to 
                <br></br>
                Wed, Jan 17, 2023 
            </div>

            <div className='trip-individual-days'>
                <h2>Monday 1/15</h2>
                {/* should these locations be links??? links that open to the location on mapquest? */}
                <p>
                    <img src={pin} className='pin'/>
                    location
                </p>
                <p>
                    <img src={pin} className='pin'/>
                    location
                </p>
            </div>
            
            <div className='trip-individual-days'>
                <h2>Tuesday 1/16</h2>
                <p>
                    <img src={pin} className='pin'/>
                    location
                </p>
                <p>
                    <img src={pin} className='pin'/>
                    location
                </p>
            </div>

            
            <div className='trip-individual-days'>
                <h2>Wednesday 1/17</h2>
                <p>
                    <img src={pin} className='pin'/>
                    location
                </p>
                <p>
                    <img src={pin} className='pin'/>
                    location
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