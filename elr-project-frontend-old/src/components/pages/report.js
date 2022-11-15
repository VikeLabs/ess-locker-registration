import React, { Component } from 'react';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      lockerValue: '',
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
    fetch(`http://localhost:8000/api/register`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ //should have a reason field?
        building: this.state.buildingValue,
        number: this.state.lockerValue,
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
        <h1 className="display-4" style = {{marginTop:30}}>Report an Locker</h1> <br/>

        <form method="post" onSubmit={this.handleSubmit} style={{ maxWidth: '40%'}}>

        <div className="form-group" style={{ maxWidth: '40%' }}>
                  <label htmlFor="buildingDrop">Choose building</label>
                  <select id="buildingDrop" className="form-control" name="buildingValue"
                    value={this.state.buildingValue} onChange={this.handleChange}>

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

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Report;
