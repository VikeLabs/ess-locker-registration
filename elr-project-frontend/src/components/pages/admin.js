import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      emailValue: '',
      lockerValue: '',
      lockerOpt: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLockerOpts() {
    // Fetch the available locker numbers from the API
    fetch('/lockersapi/available', {
      method: 'get',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        // If the request succeded, parse the JSON data.
        // Otherwise show an empty list
        if (res.status === 200) {
          return res.json();
        } else {
          console.log('Lockers req failed (Code ' + res.status + ')');
          return [];
        }
      })
      .then(json => this.setState({ lockerOpt: json }));
  }

  componentWillMount() {
    this.getLockerOpts();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // Send a request to the API to create a new locker
    fetch('/lockersapi/new', {
      method: 'post',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.nameValue,
        email: this.state.emailValue,
        locker: this.state.lockerValue,
      }),
    })
      .then(res => {
        // If the request succeeded, show the thank you page.
        // Otherwise show the error
        if (res.status === 200) {
          this.props.history.push('/register/thankyou');
        } else if (res.status >= 500) {
          alert(
            'An internal server error occurred, please try again later or contact the maintanter.'
          );
        } else {
          res.text().then(text => alert(text));
        }
      });

    event.preventDefault();
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
