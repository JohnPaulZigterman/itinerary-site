import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Nav() {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='plan'>Plan</NavLink>
      <NavLink to='browse'>Browse</NavLink>
      {/* ternary operator for login/signup vs logout */}
      {Auth.loggedIn() 
        ? // if logged in...
        (
        // if the user is logged in, show "Logout" and make the link perform the logout action
        <button className='logout-button' onClick={Auth.logout}>Logout</button>
        ) 
        : // if logged out
        (
        // if the user is not logged in, show "Login/Signup" and link to the login page
        <NavLink to='login'>Login/Signup</NavLink>
        )}
    </nav>
  );
}