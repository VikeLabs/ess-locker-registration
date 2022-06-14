import React, { Component } from 'react';

class Homepage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      emailValue: '',
      lockerValue: '',
      buildingValue: '',
      searchResults: '',
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

  handleSubmit(event) {
    // Search lockers
    fetch(`http://localhost:8000/api/search/building/${this.state.buildingValue}/number/${this.state.lockerValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      },
    })
      .then(response => {
        // If the request succeeded, show the thank you page.
        // Otherwise show the error
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ error: 'error', loading: true });
        }
      })
      .then(data => this.setState({ searchResults: data}))
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
                    value={this.state.buildingValue} onChange={this.handleChange}>
                    {/* {this.state.lockerOpt.map(value => {
                      return <option key={value.number}>{value.number}</option>;
                    })} */}
                    <option value="" enabled>Choose Building</option>
                    <option value="elw" enabled>Engineering Lab Wing</option>
                    <option value="ecs" enabled>Engineering Computer Science Building</option>
                  </select>
                </div>


                <div className="form-group" style={{ maxWidth: '20%' }}>
                  <label htmlFor="inputLocker">Enter Locker Number</label>
                  <input type="number" name="lockerValue" id="inputLocker" placeholder="Number"
                    className="form-control" value={this.state.lockerValue} onChange={this.handleChange}
                  />
                </div>

                <input type="submit" className="btn btn-primary" value="Search" />
              </form>
                {this.state.searchResults.status}
            </div>
          </div>
    );
  }

}
export default Homepage;
