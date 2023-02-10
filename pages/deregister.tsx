export default function Deregister() {
  return (
    <div className='ml-4 py-4 px-2 space-y-2'>
      <h1 className='text-3xl text-bold py-2'>Deregister This Locker</h1>

      <p>
        Locker [locker] is already registered.<br />
        If this is your locker and you'd like to deregister it, enter your name and email (case sensitive) in the form below.
      </p>

      <form action="/api/deregister" method="post" className='space-y-3'>
        <div>
          <label htmlFor="inputName">Name:</label><br />
          <input id="inputName" name="nameValue" type="text" placeholder="Enter name" className='px-1 border-2 rounded focus:border-black' />
        </div>

        <div>
          <label htmlFor="inputCode">Email:</label><br />
          <input id="inputEmail" name="emailValue" type="email" placeholder="Enter email" className='px-1 border-2 rounded focus:border-black' />
        </div>

        <input type="submit" value="Deregister" className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded' />
      </form>
    </div>
  );
}