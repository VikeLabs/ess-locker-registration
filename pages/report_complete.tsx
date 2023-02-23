import { useRouter } from 'next/router';

export default function ReportComplete() {
  const router = useRouter();
  const { building: lockerBuilding, number: lockerNumber } = router.query;

  return (
    <div className='ml-4 py-4 px-2 space-y-2'>
      <h1 className='text-3xl text-bold py-2'>Report Complete</h1>

      <p>You have reported {lockerBuilding} {lockerNumber}.</p>
    </div>
  );
} 