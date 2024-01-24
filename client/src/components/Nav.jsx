import { NavLink } from 'react-router-dom';

export default function Nav() {

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='plan'>Plan</NavLink>
      <NavLink to='browse'>Browse</NavLink>
      <NavLink to='login'>Log In</NavLink>
    </nav>
  );
}
