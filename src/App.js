import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import MarketStatus from './market-status/MarketStatus';
import CalCounter from './cal-counter/CalCounter';
import NotFoundPage from './common/NotFoundPage';
import ContactMe from './contact-me/ContactMe';
import Navbar from './common/Navbar';
import Home from './home/Home';
import React from 'react';
import './style.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/cal-count' element={<CalCounter/>} />
        <Route path='/market-status' element={<MarketStatus/>} />
        <Route path='/contact' element={<ContactMe/>} />
        <Route path="/404" element={<NotFoundPage/>} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
