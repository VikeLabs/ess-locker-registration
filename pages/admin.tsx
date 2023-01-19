export default function admin(){
    return(
        <div>
        <div className="container">
        <h1 className="display-4" style = {{marginTop:30}}>Admin</h1> <br/>

            <p>
                Can add what/how many lockers are available/unavailable here.<br/>
                Available: %n <br/>
                Unavailable: %n <br/>
            </p><br/>

            <button className="btn btn-primary btn-lg">
            Download CSV
            </button>

          </div>
        </div>
    );
}