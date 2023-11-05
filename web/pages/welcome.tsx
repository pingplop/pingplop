export default function DefaultWebPage() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='absolute top-0 h-1 w-full bg-red-600'></div>
      <div className='mx-auto -mt-14 max-w-2xl'>
        <h1 className='font-display mb-6 text-5xl font-bold leading-8 text-black'>It Works!</h1>
        <p className='text-base leading-6 text-gray-700 md:text-xl md:leading-8'>
          This is the default page when we working on it. <br />
          Here are some reasons why you are viewing this page:
        </p>
        <ul className='m-4 list-disc text-base leading-8 text-gray-700 md:text-lg'>
          <li>This is the default web page for the site.</li>
          <li>
            This page used to{' '}
            <code className='rounded bg-red-200 px-1 py-0.5 font-mono text-sm font-semibold tracking-tight text-gray-800'>
              test the server
            </code>{' '}
            configuration.
          </li>
          <li>Site owner haven&apos;t uploaded your website yet.</li>
          <li>Site owner still working on something great for you.</li>
        </ul>
        <p className='mt-4 text-base text-gray-700 md:text-lg'>
          Please contact the{' '}
          <a
            href='mailto:contact@domainaja.com'
            className='text-red-600 hover:text-red-800'
            rel='noopener noreferrer'
            target='_blank'
          >
            site owner
          </a>{' '}
          to get more information.
        </p>
      </div>
    </div>
  )
}
