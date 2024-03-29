import Head from 'next/head';

export default function Custom500() {
    return (
        <div className='ml-4 py-4 px-2 space-y-2'>
            <Head>
                <title>500 - Server Error</title>
            </Head>
            <h1 className='text-3xl text-bold py-2'>Error 500</h1>
            <p>There was a problem with the server.</p>
        </div>
    );
}