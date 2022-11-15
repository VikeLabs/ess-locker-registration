export default function Register(){
    return(
        <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
            <h1 className="display-4" style = {{marginTop:30}}>Register This Locker</h1> <br/>

            The Locker {} in {} is unregisterd. <br/>
            If you would like to register this locker please fill out the form below.<br/><br/>

            <form method="post" style={{ maxWidth: '40%'}}>
                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" name="nameValue" placeholder="Enter name" className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" name="emailValue" id="inputEmail" placeholder="Enter email"
                    className="form-control"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                    Your email will not be shared with anyone else. We will send you messages
                    regarding the status of your reservation.
                    </small>
                </div>
                
                <div>
                <input type="checkbox" id="tos" name="tos"/>
                <label>I acknowledge that these services are offered with no guarantee, and we 
                reserve the right to cut your lock at any time. We will keep locker contents for a few months. </label>
                </div><br/>

                <input type="submit" className="btn btn-primary" value="Register" />

            </form>
        </figure>
  );
}