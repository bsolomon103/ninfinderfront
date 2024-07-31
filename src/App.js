// src/App.js

import React from 'react';
import TestComponent from './TestComponent';
import TravelInfoBox from './CenterSearch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Article from './Article';
import { UserProvider } from './UserContext'


function App() {
  return (
    <Router>
        <UserProvider>
        <div className="App">
           <Navbar />
          <header className="App-header">
          </header>
           <Routes>
            <Route path="/" element={<TravelInfoBox />} />
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Article/>}/>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        </div>
        </UserProvider>
    </Router>
  );
}

export default App;

