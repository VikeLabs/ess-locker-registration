import Head from "next/head";

export default function NotFound() {
  return (
    <div className='ml-4 py-4 px-2 space-y-2'>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <h1 className='text-3xl text-bold py-2'>Error 404</h1>
      <p>This page could not be found.</p>
    </div>
  );
}