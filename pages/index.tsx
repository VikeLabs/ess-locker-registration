export default function Home() {
    return (
        <div className='ml-4 py-4 px-2 space-y-2'>
            <h1 className='text-3xl text-bold py-2'>ESS Locker Registration</h1>

            <p>
                Select a locker to begin.
            </p>
            <br />

            <h2 className='text-xl text-bold py-2'>Select Locker</h2>

            <form action="/register" method="post" className='space-y-3'>
                <div>
                    <label htmlFor="buildingDrop">Building:</label><br />
                    <select id="buildingDrop" name="buildingValue" className='border-2 rounded focus:border-black'>
                        <option value="" >Select Building</option>
                        <option value="elw" >Engineering Lab Wing</option>
                        <option value="ecs" >Engineering Computer Science Building</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="inputLocker">Locker Number:</label><br />
                    <input type="number" name="lockerValue" id="inputLocker" placeholder="Select Number" className='border-2 rounded px-1' />
                </div>

                <input type="submit" value="Search" className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded' />
            </form>
        </div>
    )
}