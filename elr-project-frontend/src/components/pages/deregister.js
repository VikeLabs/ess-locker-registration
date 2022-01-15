import React, { Component } from 'react';

class Deregister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberValue: '',
      codeValue: '',
      emailValue: '',
      lockerValue: '',
      lockerOpt: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCode   = this.handleCode.bind(this);
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
    // Send the code to the API and have it delete the locker
    // if the code is correct
    fetch('/lockersapi/deregister/confirm', {
      method: 'delete',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.state.codeValue,
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

  handleCode(event) {
    // Send an API request to have a locker reset code genereated
    // and emailed to the user
    fetch('/lockersapi/deregister/code', {
      method: 'post',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: this.state.numberValue,
        email: this.state.emailValue,
      }),
    })
      .then(res => {
        // If the request succeeded, let the user know
        if (res.status >= 500) {
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
        <h1 className="display-4" style = {{marginTop:30}}>Deregister a Locker</h1> <br/>

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

            <div className="form-group" style={{ maxWidth: '20%' }}>
            <label htmlFor="lockerDrop">Choose building</label>
            <select id="lockerDrop" className="form-control" name="lockerValue"
              value={this.state.lockerValue} onChange={this.handleChange}>
              {this.state.lockerOpt.map(value => {
                return <option key={value.number}>{value.number}</option>;
              })}
              <option value="" enabled>Choose Building</option>
              <option value="CSCU" enabled>CSCU</option>
              <option value="ESS" enabled>ELW</option>
            </select>
          </div>

          <div className="form-group" style={{ maxWidth: '20%' }}>
            <label htmlFor="inputLocker">Enter Locker Number</label>
            <input type="number" name="lockerValue" id="inputLocker" placeholder="Number"
              className="form-control" value={this.state.emailValue} onChange={this.handleChange}
            />
          </div>

            <input type="submit" className="btn btn-primary"value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Deregister;
