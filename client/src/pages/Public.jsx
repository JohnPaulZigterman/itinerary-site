// displays trip cards for user's friends

import { Link } from 'react-router-dom';
import Trip from '../components/UI/Trip';

export default function Public() {
    return (
        <div>
            <div>Other Trips</div>
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