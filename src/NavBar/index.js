import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Navbar.css'; // Import custom CSS
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setUser(null);
    navigate('/sign-in');
 
    
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom-green fixed-top">
      <Link className="navbar-brand" to="/">
          NINFinder.com
        <img 
          src='https://img.icons8.com/?size=100&id=103675&format=png&color=000000'
          //"https://img.icons8.com/?size=100&id=EKVrfuuSsCoo&format=png&color=000000" // Update this path to your image
          alt="MyLogo" 
          style={{ height: '60px', width:'60px' }} // Adjust the size as needed
        />
      </Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Centers <span className="sr-only"></span></Link>
          </li>
        
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
  
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



/*
    <li className="nav-item active">
            <Link className="nav-link" to="/articles">Articles <span className="sr-only"></span></Link>
    </li>
    <li className="nav-item">
            {user ? (<span className='nav-link' onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</span>) : 
            (<Link className='nav-link' to='/sign-in'>Login</Link>)}
          </li>
          {user && (<li className='navbar-right justify-content-end'>
                    <span className='nav-link'>Welcome {user.name}</span>
            
                  </li>)}
*/
