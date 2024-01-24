import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Nav() {
  // If the user is logged in, return the logout button, otherwise return the login button
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='plan'>Plan</NavLink>
      <NavLink to='browse'>Browse</NavLink>
      {/* If the user is login show the logout button */}
      {Auth.loggedIn() ? (
        <NavLink
        onClick={logout}>Logout
        </NavLink>
      ) : (
        <NavLink to='login'>Log In</NavLink>
      )}
    </nav>
  );
}