import Head from 'next/head';
import { ECS_ID, ELW_ID, ECS_COUNT, ELW_COUNT } from '../lib/locker_constants';
import validateSearch from '../lib/form_validation/validate_search';

export default function Search() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const building = parseInt(data.get('building') as string);
    const number = parseInt(data.get('number') as string);

    const isValid = validateSearch(building, number);

    if (!isValid) {
      alert('Invalid locker number');
      return false;
    }

    return true;
  }

  return (
    <div className='ml-4 py-4 px-2 space-y-2'>
      <Head>
        <title>ESS Locker Registration</title>
      </Head>
      <h1 className='text-3xl text-bold py-2'>ESS Locker Registration</h1>

      <p>
        Select a locker to begin.
      </p>

      <form action="/api/search" onSubmit={onSubmit} className='space-y-3'>
        <div>
          <label htmlFor="buildingDrop">Building:</label>
          <br />
          <select id="buildingDrop" name="building" required
            className='border-2 rounded focus:border-black'
          >
            <option value={ELW_ID} >Engineering Lab Wing</option>
            <option value={ECS_ID} >Engineering Computer Science Building</option>
          </select>
        </div>

        <div>
          <label htmlFor="inputLocker">Locker Number:</label>
          <br />
          <input id="inputLocker" name="number" type="number" placeholder="Select Number" required
            className='px-1 border-2 rounded focus:border-black'
          />
        </div>

        <input type="submit" value="Search"
          className='bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded'
        />
      </form>
    </div>
  );
}