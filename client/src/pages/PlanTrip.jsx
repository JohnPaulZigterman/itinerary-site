// form for creating a trip
// is this all we want on this page? and then once the trip dates/location are set, should route user to another
// page to fill out the dates?


import '../styles/TripPlanner.css';

export default function PlanTrip() {
    return (
        <div className='trip-planner'>

            <div>Planning Tool</div>

            <form>
                <p>Enter the date you want to start your trip?</p>
                <input type="date" id="dateStart" required />
                <p>Enter the date you want to end your trip?</p>
                <input type="date" id="dateEnd" required />
                <p>Enter the trip destination</p>
                <input type="text" id="destination" placeholder="Where are you going?" list="auto-complete" required />
                <button type="submit" class="pure-button-primary" id="scheduleButton">Map Your Days!</button>
            </form>

        </div>
    );
}