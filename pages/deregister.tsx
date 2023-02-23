import { useRouter } from 'next/router';
import Head from "next/head";

export default function Deregister() {
  const router = useRouter();
  const { building: lockerBuilding, number: lockerNumber } = router.query;

  return (
    <div className='ml-4 py-4 px-2 space-y-2'>
      <Head>
        <title>Deregister</title>
      </Head>
      <h1 className='text-3xl text-bold py-2'>Deregister This Locker</h1>

      <p>
        {lockerBuilding} {lockerNumber} is already registered.
      </p>

      <p className="pt-4">
        If {lockerBuilding} {lockerNumber} is your locker and you'd like to deregister it, enter your name and email (case sensitive) in the form below.
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

      <p className="pt-4">
        If {lockerBuilding} {lockerNumber} is not your locker but it doesn't have a lock on it, please report it below.
      </p>

      <form action="/api/report" method="post" className='space-y-3'>
        <input type="submit" value="Report Registered Locker" className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded' />
      </form>
    </div>
  );
}