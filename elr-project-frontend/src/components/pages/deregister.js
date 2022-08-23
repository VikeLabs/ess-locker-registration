import React, { Component } from 'react';
import Homepage from './homepage';

class Deregister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberValue: '',
      codeValue: '',
      emailValue: '',
      lockerValue: '',
      nameValue: '',
      emailValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //need to get building and number from previous page
  handleSubmit(event) {
    // Send the code to the API and have it delete the locker
    // if the code is correct
    fetch('/http://localhost:8000/api/deregister', {
      method: 'PUT',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        building: Homepage.state.buildingValue,
        number: Homepage.state.lockerValue,
        user: this.state.nameValue,
        userEmail: this.state.emailValue
      }),
    })
      .then(res => {
        // If the request was successful, redirect to thank you page,
        // otherwise show what the error was
        if (res.status === 200) {
          this.props.history.push('/deregister/thankyou');
        } else if (res.status >= 500) {
          alert(
            'An internal server error occurred, please try again later or contact the maintaner.'
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
        <h1 className="display-4" style = {{marginTop:30}}>Deregister This Locker</h1> <br/>

        Locker {Homepage.state.lockerValue} in {Homepage.state.buildingValue} is already registered. <br/> If this is your locker and you'd like to deregister it, enter your credentials in the form below.
        <br/><br/>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">

          <div className="form-group" style = {{maxWidth: "40%"}}>
            <label htmlFor="inputName">Name</label>
            <input type="text" name="nameValue" placeholder="Enter name" className="form-control"
              value={this.state.nameValue} onChange={this.handleChange}
            />
          </div>
            <label htmlFor="inputCode">Email</label>
            <div className="form-row" style = {{maxWidth: "80%"}}>
              <div className="form-group col-md-6">
                <input type="email" name="emailValue" id="inputEmail" placeholder="Enter email"
                  className="form-control" value={this.state.emailValue} onChange={this.handleChange}
                />
              </div>
            </div>

            /*<input type="submit" className="btn btn-primary"value="Deregister" />*/

          </div>
        </form>
      </div>
    );
  }
}

export default Deregister;
