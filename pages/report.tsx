export default function report() {
  return (
    <div className="container">
      <h1 className="display-4" style={{ marginTop: 30 }}>Report an Locker</h1> <br />

      <form method="post" style={{ maxWidth: '40%' }}>

        <div className="form-group" style={{ maxWidth: '40%' }}>
          <label htmlFor="buildingDrop">Choose building</label>
          <select id="buildingDrop" className="form-control" name="buildingValue"
          >

            <option value="" >Choose Building</option>
            <option value="elw" >Engineering Lab Wing</option>
            <option value="ecs" >Engineering Computer Science Building</option>
          </select>
        </div>


        <div className="form-group" style={{ maxWidth: '20%' }}>
          <label htmlFor="inputLocker">Enter Locker Number</label>
          <input type="number" name="lockerValue" id="inputLocker" placeholder="Number"
            className="form-control"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
}