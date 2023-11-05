import { Link } from 'react-router-dom'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { Button } from '@tremor/react'

export default function ErrorNotFound() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='absolute top-0 h-1.5 w-full bg-gray-900' />
      <div className='mx-auto -mt-24 max-w-lg text-center md:max-w-2xl lg:text-left'>
        <h1 className='text-3xl font-bold leading-8 text-black md:text-5xl'>
          404 - Page not found!
        </h1>
        <p className='mt-8 text-base font-medium leading-6 tracking-wide text-gray-700 md:text-xl md:leading-8'>
          Sorry, we can&apos;t find that page. <br className='block md:hidden' /> Check that you
          typed the address correctly, or try using our site search to find something specific.
        </p>
        <p className='mt-8 text-base font-medium text-gray-700 md:mt-10 md:text-lg'>
          <Button icon={ArrowLeftCircleIcon} iconPosition='left' size='lg'>
            <Link to='/'>
              <span>Back to dashboard</span>
            </Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
