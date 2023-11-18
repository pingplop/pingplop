import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Text } from '@tremor/react'

import BrandLogo from '@/assets/images/logo-light.svg'
import { cn } from '@/utils/ui-helper'

const navlinks = [
  {
    id: 'status',
    label: 'Service Status',
    href: '/',
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    href: '/maintenance',
  },
  {
    id: 'incidents',
    label: 'Previous Incidents',
    href: '/incidents',
  },
]

export function HomeLayout() {
  const { pathname } = useLocation()

  return (
    <div className='flex h-full min-h-screen flex-1 flex-col bg-white'>
      <div className='mx-auto flex h-full w-full w-full max-w-screen-lg grow flex-col px-4 md:px-8'>
        <header className='mx-auto mb-4 flex w-full max-w-2xl items-center justify-between py-4 md:py-8 lg:max-w-none'>
          <Link
            to='/'
            className='inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl'
            aria-label='logo'
          >
            <img src={BrandLogo} className='h-8 w-auto text-yellow-500' alt='Brand Logo' />
          </Link>

          <nav className='hidden gap-12 lg:flex'>
            {navlinks.map((item) => (
              <Link key={item.id} to={item.href}>
                <Text
                  className={cn(
                    pathname === item.href
                      ? 'text-yellow-500'
                      : 'text-gray-600 hover:text-yellow-500',
                    'font-semibold transition duration-100 active:text-yellow-700'
                  )}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </nav>

          <div>
            <Button type='button' variant='secondary' size='sm' className='hidden lg:inline-block'>
              <Link to='#'>Contact Us</Link>
            </Button>
            <button
              type='button'
              className='inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-yellow-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              Menu
            </button>
          </div>
        </header>

        <main className='grow'>
          <Outlet />
        </main>

        <footer className='mx-auto w-full bg-white px-4 py-4 sm:py-10 md:px-8 lg:py-12'>
          <div className='flex flex-col items-center border-t pt-6'>
            <Link
              to='https://github.com/pingplop?ref=tenantId'
              rel='noopener noreferrer'
              target='_blank'
            >
              <Text className='font-medium hover:text-yellow-600'>Powered by Pingplop</Text>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
