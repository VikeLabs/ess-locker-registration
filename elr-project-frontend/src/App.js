import React, { Component } from 'react';
import {useEffect} from "react";
import { Link } from 'react-router-dom'; //testing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import {
  //  BrowserRouter,
  //  Routes,
  //  Route
  //} from 'react-router-dom';
  //HashRouter as Router
  import Navbar from './components/navbar/index.js';
  
  import Header from './components/header/header.js';
  import Homepage from './components/pages/homepage.js';
  import Contact from './components/pages/contact.js';
  import Register from './components/pages/register.js';
  import Deregister from './components/pages/deregister.js'; 
  import Renew from './components/pages/renew.js';
  import Lost from './components/pages/404.js';
  import ThankYou from './components/pages/thankyou.js';
  import RenewDone from './components/pages/renewDone.js';
  import DeregDone from './components/pages/deregDone.js';
  import Report from './components/pages/report.js';
  import Admin from './components/pages/admin.js';
  
  import './assets/css/custom.min.css';

  const registerResult = document.getElementById('register-result');


function App() {

  useEffect(() => {
    fetch('http://localhost:5000/report/')
    .then(response => response.json())
    .then(json => console.log(json))
    }, []);

  async function put(uri = '', data = {}) {
      const response = await fetch(uri, {
          method: 'PUT',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow',
          body: JSON.stringify(data)  
      });
      return response.json();
  }

  async function get(uri = '') {
    const response = await fetch(uri);
    return response.json();
}

async function register(building, number, user, userEmail) {
  const data = {'building': building, 'number': number, 'user': user, 'userEmail': userEmail};
  put(`http://localhost:5000/register/`, data)
  .then(result => {
      registerResult.innerHTML = (result.msg) ? result.msg : result.err;
  });
}

  return (
    <Router>
      {/*<div className="App">*/}
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route path='/register/thankyou' element={<ThankYou/>} />
        <Route exact path='/deregister' element={<Deregister/>} />
        <Route path='/deregister/thankyou' element={<DeregDone/>} />
        <Route exact path='/renew' element={<Renew/>} />
        <Route path='/renew/thankyou' element={<RenewDone/>} />
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
