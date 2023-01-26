export default function Home() {
    return (
        <div className='ml-4 py-4 px-2 space-y-2'>
            <h1 className='text-3xl text-bold py-2'>ESS Locker Registration</h1>
                
            <p>
                Select a locker to begin.
            </p>
            <br/>

            <h2 className='text-xl text-bold py-2'>Select Locker</h2>
            
            {/* FORM STARTS */}
            <form action="/register" method="post" className='space-y-3'>


                <div>
                    <label htmlFor="buildingDrop">Building:</label><br/>
                    <select id="buildingDrop" name="buildingValue" className='border-2 rounded focus:border-black'>
                      {/* // value={this.state.buildingValue} onChange={this.handleChange}> */}

                      <option value="" >Select Building</option>
                      <option value="elw" >Engineering Lab Wing</option>
                      <option value="ecs" >Engineering Computer Science Building</option>
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="inputLocker">Locker Number:</label><br/>
                    <input type="number" name="lockerValue" id="inputLocker" placeholder="Select Number" className='border-2 rounded px-1'/>
                </div>

                <input type="submit" value="Search" className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded'/>
            </form>
        </div>    
    )
}

//HOME

// import React, { Component } from 'react';
// import { Navigate } from "react-router-dom";

// class Homepage extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       nameValue: '',
//       emailValue: '',
//       lockerValue: '',
//       buildingValue: '',
//       searchResults: '',
//     };
    
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
  
//   handleChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
    
    
//     this.setState({
//       [name]: value,
//     });
//   }
  
//   handleSubmit(event) {
//     // Search lockers
//     fetch(`http://localhost:8000/api/search/building/${this.state.buildingValue}/number/${this.state.lockerValue}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Origin': 'http://localhost:3000'
//       },
//     })
//     .then(response => {
//       // If the request succeeded, return.
//       // Otherwise show the error
//       if (response.ok) {
//         return response.json();
//       } else {
//         this.setState({ error: 'error', loading: true });
//       }
//     })
//     .then(data => this.setState({ searchResults: data}))
//     event.preventDefault();
//   }

//   render() {
//     if(this.state.searchResults.status == "available"){
//       return <Navigate to="/thankyou"/>
//     }
//     else if(this.state.searchResults.status == "unavailable"){
//       return <Navigate to="/homepage"/>
//     }
//     return (
//       <div>
//         <div className="container"><br/>
//             <h1 className="display-4">ESS Locker Registration</h1>
            
//             <p style={{marginTop: 30}}>
//               This is the locker registration page for the lockers belonging to the ESS.
//             </p>
//             <br/>

//               <h2 className="display-7">Locker Search</h2>
//               <form method="post" onSubmit={this.handleSubmit} style={{ maxWidth: '80%'}}>


//                 <div className="form-group" style={{ maxWidth: '40%' }}>
//                   <label htmlFor="buildingDrop">Choose building</label>
//                   <select id="buildingDrop" className="form-control" name="buildingValue"
//                     value={this.state.buildingValue} onChange={this.handleChange}>
//                     {/* {this.state.lockerOpt.map(value => {
//                       return <option key={value.number}>{value.number}</option>;
//                     })} */}
//                     <option value="" enabled>Choose Building</option>
//                     <option value="elw" enabled>Engineering Lab Wing</option>
//                     <option value="ecs" enabled>Engineering Computer Science Building</option>
//                   </select>
//                 </div>


//                 <div className="form-group" style={{ maxWidth: '20%' }}>
//                   <label htmlFor="inputLocker">Enter Locker Number</label>
//                   <input type="number" name="lockerValue" id="inputLocker" placeholder="Number"
//                     className="form-control" value={this.state.lockerValue} onChange={this.handleChange}
//                   />
//                 </div>

//                 <input type="submit" className="btn btn-primary" value="Search" />
//               </form>
//                 {this.state.searchResults.status} 
//             </div>
//           </div>
//     );
//   }

// }
// export default Homepage;