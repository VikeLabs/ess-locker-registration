import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/index.js';

import Homepage from './components/pages/homepage.js';
import Contact from './components/pages/contact.js';
import Register from './components/pages/register.js';
import Deregister from './components/pages/deregister.js'; 
import Lost from './components/pages/404.js';
import ThankYou from './components/pages/thankyou.js';
import DeregDone from './components/pages/deregDone.js';
import Report from './components/pages/report.js';
import Admin from './components/pages/admin.js';

import './assets/css/custom.min.css';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route path='/register/thankyou' element={<ThankYou/>} />
        <Route exact path='/deregister' element={<Deregister/>} />
        <Route path='/deregister/thankyou' element={<DeregDone/>} />
        <Route exact path='/report' element={<Report/>} />
        <Route exact path='/admin' element={<Admin/>} />
        <Route exact path='/thankyou' element={<ThankYou/>} />
        <Route element={<Lost/>} />
      </Routes>
      {/*</div>*/}
    </Router>
  );
  }

  export default App;
