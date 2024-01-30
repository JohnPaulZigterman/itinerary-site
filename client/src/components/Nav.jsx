import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Nav.css';


export default function Nav() {
  return (
    <nav>
      {Auth.loggedIn() 
        ? // if logged in...
        (
        <>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='plan'>Plan</NavLink>
          <NavLink to='browse'>Browse</NavLink>
          <button className='logout-button' onClick={Auth.logout}>Logout</button>
        </>
        ) 
        : // if logged out
        (
        // if the user is not logged in, do not render anything
        null
        )}
    </nav>
  );
}