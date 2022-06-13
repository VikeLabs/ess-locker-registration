import React, {Component, useState, useEffect} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        input: {
        nameValue: '',
        emailValue: '',
        apicount: 0,
        serverResponse: '',
        lockerValue: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() { 
    // this.getLockerOpts();
    fetch('http://localhost:5000/count')
    .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          this.setState({ error: 'error', loading: true });
      }
    })
    .then(data => this.setState({ apicount: data}))
  }  

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //still need to pass building/number vars from homepage
  handleSubmit(event) {
    fetch(`http://localhost:5000/register`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        building: 'elw',
        number: 101,
        user: this.state.nameValue,
        userEmail: this.state.emailValue
      })
    })
    .then(res => {
      // If the request succeeded, show the thank you page.
      // Otherwise show the error
      if (res.status == 200) {
        this.setState({serverResponse: res.status})
        // this.props.history.push('/register/thankyou');
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

        The Locker #202 in the ELW is unregisterd. <br/>
        If you would like to register this locker please fill out the form below.<br/><br/>

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

          <input type="submit" className="btn btn-primary" value="Register" />

        </form>
      </div>
    );
  }
}

export default Register;

