import React, { Component } from 'react';

class Contact extends Component {//display-4, jumbotron
  render() {
    return (
      <div className="container">
        <div className="container">
          <h1 className="display-4" style = {{marginTop:30}}>Contact</h1> <br/>
          <p>Lockers system maintainer: <a href="mailto:">Name</a></p>
          <p>ESS Director of IT: <a href="mailto:ca">Name</a></p>
        </div>
      </div>
    );
  }
}

export default Contact;
