import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //where possible state variables go
    };
  }


  render() {
    return (
        <div>
        <div className="container">
        <h1 className="display-4" style = {{marginTop:30}}>Admin</h1> <br/>

            <p>
                Can add what/how many lockers are available/unavailable here.<br/>
                Available: %n <br/>
                Unavailable: %n <br/>
            </p><br/>

            <Link to="/">
              <button className="btn btn-primary btn-lg">
                Download CSV
              </button>
            </Link>

          </div>
        </div>
    );
  }
}

export default Admin;
