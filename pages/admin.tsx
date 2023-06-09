import Head from "next/head";
import { ECS_ID, ELW_ID } from "../lib/locker_constants";
import { stripHtml } from "string-strip-html";

type ReportedLocker = {
  building: number,
  number: number,
  name: string,
  email: string,
  reported_at: Date,
}

function Counts() {
  const available = 0;
  const total = 100;
  return (
    <p>Available: {available}/{total}</p>
  )
}

function LockerRow(locker: ReportedLocker) {
  return (
    <tr>
      <td className="px-1 border border-collapse">{locker.building == ECS_ID ? "ECS" : "ELW"}</td>
      <td className="px-1 border border-collapse">{locker.number}</td>
      <td className="px-1 border border-collapse">{stripHtml(locker.name).result}</td>
      <td className="px-1 border border-collapse">{stripHtml(locker.email).result}</td>
      <td className="px-1 border border-collapse">{new Intl.DateTimeFormat('en-US').format(locker.reported_at)}</td>
    </tr>
  )
}

function ReportedLockers() {
  const reportedLockers = [ // TODO: replace with actual data from database
    { building: ECS_ID, number: 1, name: "John Doe", email: "johndoe@domain.com", reported_at: new Date("2021-01-01") },
    { building: ELW_ID, number: 2, name: "Jane Doe", email: "janedoe@domain.com", reported_at: new Date("2021-01-02") },
  ];

  const lockerRows = reportedLockers.map((locker) => LockerRow(locker));

  return (
    <table className="table-auto border border-collapse">
      <thead>
        <tr className="text-left">
          <th className="px-1 border border-collapse">Locker Building</th>
          <th className="px-1 border border-collapse">Locker Number</th>
          <th className="px-1 border border-collapse">User Name</th>
          <th className="px-1 border border-collapse">User Email</th>
          <th className="px-1 border border-collapse">Reported Date</th>
        </tr>
      </thead>
      <tbody>{lockerRows}</tbody>
    </table>
  )
}

export default function Admin() {
  return (
    <div className="ml-4 py-4 px-2 space-y-2">
      <Head>
        <title>Admin Tools</title>
      </Head>
      <h1 className="text-3xl text-bold py-2">Admin Tools</h1>

      <Counts></Counts>

      <ReportedLockers></ReportedLockers>

      <div> {/*since the a tag is an inline element, we need to wrap it in a div to make it block*/}
        <a href="/admin" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
          Download CSV
        </a>
      </div>
    </div>
  );
}