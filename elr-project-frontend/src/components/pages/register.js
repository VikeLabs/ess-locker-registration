import React, { Component } from 'react';

class Register extends Component {
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
      <div className="container">
        <h1 className="display-4" style = {{marginTop:30}}>Register This Locker</h1> <br/>

        The Locker #202 in 

        <form method="post" onSubmit={this.handleSubmit} style={{ maxWidth: '40%'}}>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input type="text" name="nameValue" placeholder="Enter name" className="form-control"
              value={this.state.nameValue} onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="email" name="emailValue" id="inputEmail" placeholder="Enter email"
              className="form-control" value={this.state.emailValue} onChange={this.handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Your email will not be shared with anyone else. We will send you messages
              regarding the status of your reservation.
            </small>
          </div>
          
          <div>
          <input type="checkbox" id="tos" name="tos"/>
          <label for="scales">I achnowledge that these services are offered with no guarantee, and we 
          reserve the right to cut your lock at any time. We will keep locker contents for a few months. </label>
          </div><br/>

          {/*<input type="submit" className="btn btn-primary" value="Register" />*/}
          <button className="btn btn-primary">
                  <a href = "http://localhost:3000/thankyou" style={{color: "#000000"}}>
                    Register
                  </a>
                </button>
        </form>
      </div>
    );
  }
}

export default Register;
