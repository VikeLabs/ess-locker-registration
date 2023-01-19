export default function Deregister(){
    return(
    <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <h1 className="display-4" style = {{marginTop:30}}>Deregister This Locker</h1> <br/>

        Locker  in  is already registered. <br/> If this is your locker and you'd like to deregister it, enter your credentials in the form below.
        <br/><br/>

        <form >
          <div className="form-group">

          <div className="form-group" style = {{maxWidth: "40%"}}>
            <label htmlFor="inputName">Name</label>
            <input type="text" name="nameValue" placeholder="Enter name" className="form-control"
            />
          </div>
            <label htmlFor="inputCode">Email</label>
            <div className="form-row" style = {{maxWidth: "80%"}}>
              <div className="form-group col-md-6">
                <input type="email" name="emailValue" id="inputEmail" placeholder="Enter email"
                  className="form-control"
                />
              </div>
            </div>

            <input type="submit" className="btn btn-primary"value="Deregister" />

          </div>
        </form>
    </figure>
  );
}