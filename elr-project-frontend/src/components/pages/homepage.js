import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  
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
        <div className="container"><br/>
            <h1 className="display-4">ESS Locker Registration</h1>
            
            <p style={{marginTop: 30}}>
              This is the locker registration page for the lockers in the ELW.
            </p>
            <br/>

              <h2 className="display-7">Locker Search</h2>
              <form method="post" onSubmit={this.handleSubmit} style={{ maxWidth: '80%'}}>


                <div className="form-group" style={{ maxWidth: '40%' }}>
                  <label htmlFor="buildingDrop">Choose building</label>
                  <select id="buildingDrop" className="form-control" name="buildingValue"
                    value={this.state.lockerValue} onChange={this.handleChange}>
                    {this.state.lockerOpt.map(value => {
                      return <option key={value.number}>{value.number}</option>;
                    })}
                    <option value="" enabled>Choose Building</option>
                    <option value="ELW" enabled>Engineering Lab Wing</option>
                    <option value="ECS" enabled>Engineering Computer Science Building</option>
                  </select>
                </div>

                <div className="form-group" style={{ maxWidth: '20%' }}>
                  <label htmlFor="inputLocker">Enter Locker Number</label>
                  <input type="number" name="lockerValue" id="inputLocker" placeholder="Number"
                    className="form-control" value={this.state.emailValue} onChange={this.handleChange}
                  />
                </div>

                {/*<input type="submit" className="btn btn-primary" value="Search" />*/}
                <button className="btn btn-primary">
                  <a href = "http://localhost:3000/register" style={{color: "#000000"}}>
                    Search
                  </a>
                </button>
              </form>
            </div>
          </div>
    );
  }

}
export default Homepage;
