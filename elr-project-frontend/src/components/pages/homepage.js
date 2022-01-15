import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
      <div>
        <div className="container"><br/>
            <h1 className="display-4">ESS Locker Registration</h1>
            
            <p style={{marginTop: 30}}>
              This is the locker registration page for the lockers in the ELW.
            </p>
            <Link to="register">
              <button className="btn btn-primary btn-lg">
                I&#39;m ready to register
              </button>
            </Link><br/><br/>

            <Link to="deregister">
              <button className="btn btn-primary btn-lg">
                I&#39;d like to deregister a locker
              </button>
            </Link>

            <p style={{marginTop: 30}}>
              I'd like to report an empty locker.
            </p>
            <Link to="report">
              <button className="btn btn-primary btn-lg">
                Report
              </button>
            </Link><br/><br/>
          </div>
        </div>
    );
  }
}
export default Homepage;
