import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <p>Weather App</p>
      <div className='links'>
      <Link to='/'>Home</Link>
      <Link to="/weather">Weather</Link>
      <Link to='/about'>About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
