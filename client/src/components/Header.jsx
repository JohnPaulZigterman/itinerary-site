import '../styles/Header.css';
import pin from '../assets/pin.png';
import Nav from './Nav.jsx';

function Header() {
  return (
    <header>
      <div className='container'>
        <div className='left-container'>
          <img src={pin} className='pin'/>
        </div>
        <div className='right-container'>ITINERATE</div>
      </div>
      <Nav />
    </header>
  );
}

export default Header;