// src/SignIn.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signin.css'
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

const SignIn = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    try {
      const response = await axios.post('http://18.175.58.136:8888/sign-in/', {
        'email': email,
        'password': password,
      });
      if (response.status === 200) {
        
        const user = {name: email};
        setUser(user);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="sign-in-container">
          <div className="sign-in-box">
            <h2>
              Naija-Info.com
            <img 
              src="https://img.icons8.com/?size=100&id=EKVrfuuSsCoo&format=png&color=000000" // Update this path to your image
              alt="MyLogo" 
              style={{ height: '60px', width:'60px' }} // Adjust the size as needed
              >
            </img>
            </h2>
       
        <form onSubmit={handleSubmit} className="email-sign-in-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In with Email</button>
        </form>
        <p>Don't have an account? <Link to="/sign-up">Sign up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;


/*
<div className="sign-in-container">
      <div className="sign-in-box">
        <h2>
          Naija-Info.com
        <img 
          src="https://img.icons8.com/?size=100&id=EKVrfuuSsCoo&format=png&color=000000" // Update this path to your image
          alt="MyLogo" 
          style={{ height: '60px', width:'60px' }} // Adjust the size as needed
          >
        </img>
        </h2>

*/