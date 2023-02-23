import { useRouter } from "next/router";
import Head from "next/head";

export default function Register() {
  const router = useRouter();
  const { building: lockerBuilding, number: lockerNumber } = router.query;

  return (
    <div className='ml-4 py-4 px-2 space-y-2'>
      <Head>
        <title>Register</title>
      </Head>
      <h1 className='text-3xl text-bold py-2'>Register This Locker</h1>

      <p>
        {lockerBuilding} {lockerNumber} is unregistered.<br />
        If you would like to register {lockerBuilding} {lockerNumber}, please fill out the form below:
      </p>

      <form action="/api/register" method="post" className='space-y-3'>
        <div>
          <label htmlFor="inputName">Name:</label><br />
          <input id="inputName" name="nameValue" type="text" placeholder="Enter name" className='px-1 border-2 rounded focus:border-black' />
        </div>

        <div>
          <label htmlFor="inputEmail">Email:</label><br />
          <input id="inputEmail" name="emailValue" type="email" placeholder="Enter email" className="px-1 border-2 rounded focus:border-black" />
        </div>

        <div>
          <input id="tos" name="tos" type="checkbox" />
          <label htmlFor="tos">I acknowledge that these services are offered with no guarantee, and we
            reserve the right to cut your lock at any time. If we cut your lock, we will keep your locker contents for a few months. </label>
        </div>

        <input type="submit" value="Register" className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded' />
      </form>
    </div>
  );
}