// displays trip cards for user's friends

import { Link } from 'react-router-dom';
import Trip from '../components/UI/Trip';

export default function Public() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        // Fetch trips from your backend API
        fetch('/api/trips')
            .then(response => response.json())
            .then(data => setTrips(data));
    }, []);

    return (
        <div>
            <div>Other Trips</div>
            <div className='all-trips'>
                {trips.map(trip => (
                    <Trip key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    );
}