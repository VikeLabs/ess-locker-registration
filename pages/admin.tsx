import Head from "next/head";

function Counts() {
  const available = 0;
  const total = 100;
  return (
    <p>Available: {available}/{total}</p>
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

      <div> {/*since a tag is an inline element, we need to wrap it in a div to make it block*/}
        <a href="/api/downloadCSV" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
          Download CSV
        </a>
      </div>
    </div>
  );
}