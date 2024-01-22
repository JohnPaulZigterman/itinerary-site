// displays user's trip cards

import { Link } from 'react-router-dom';
import Trip from '../components/UI/Trip';

export default function MyTrips() {
    return (
        <div>
            <div>My Trips</div>

            <div className='all-trips'>
                {/* adjust <Trip /> so that it maps over all Trips? belonging to logged in user */}
                <Trip />
                <Trip />
                <Trip />
                <Trip />
            </div>
        </div>

    );
}