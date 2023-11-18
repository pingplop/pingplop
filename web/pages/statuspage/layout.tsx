import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { DocumentFullScreen } from '@chiragrupani/fullscreen-react'
import { ArrowsPointingOutIcon, LightBulbIcon } from '@heroicons/react/20/solid'
import { Button, Text } from '@tremor/react'
import { Icon } from '@tremor/react'

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

export default function PublicLayout() {
  const { pathname } = useLocation()
  const [isFullScreen, setFullScreen] = useState(false)

  return (
    <DocumentFullScreen
      isFullScreen={isFullScreen}
      onChange={(isFull: boolean) => {
        setFullScreen(isFull)
      }}
    >
      <div className='flex h-full min-h-screen flex-1 flex-col bg-gray-50/5'>
        <div className='mx-auto flex h-full w-full w-full max-w-screen-lg grow flex-col px-4 md:px-8'>
          <header className='mx-auto mb-4 flex w-full max-w-2xl items-center justify-between py-4 md:py-8 lg:max-w-none'>
            <Link
              to='/'
              className='inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl'
              aria-label='logo'
            >
              <img src={BrandLogo} className='h-7 w-auto text-yellow-500' alt='Brand Logo' />
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

            <div className='flex gap-4'>
              <Button
                type='button'
                className='hidden lg:inline-block'
                variant='secondary'
                color='amber'
                size='xs'
              >
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

          <footer className='mx-auto w-full py-4 sm:py-6 lg:py-8'>
            <div className='flex flex-col items-center border-t pt-6'>
              <div className='mx-auto w-full px-0.5 md:flex md:items-center md:justify-between'>
                <div className='flex items-center justify-center justify-between gap-4 pl-1'>
                  <Button
                    size='xs'
                    type='button'
                    color='gray'
                    variant='light'
                    icon={ArrowsPointingOutIcon}
                    onClick={() => setFullScreen(!isFullScreen)}
                  >
                    <Text color='gray'>Fullscreen View</Text>
                  </Button>
                  <Icon
                    icon={LightBulbIcon}
                    variant='solid'
                    className='cursor-pointer md:hidden'
                    tooltip='Toggle theme'
                    color='neutral'
                    size='xs'
                  />
                </div>
                <div className='flex flex-col items-center justify-center gap-4 border-t md:flex md:flex-row md:justify-between md:border-none'>
                  <Link
                    to={`https://pingplop.com/?ref=${window.location.host}&utm_source=powered_by`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <Text className='font-medium hover:text-yellow-600'>Powered by Pingplop</Text>
                  </Link>
                  <Icon
                    icon={LightBulbIcon}
                    variant='solid'
                    className='hidden cursor-pointer'
                    tooltip='Toggle theme'
                    color='neutral'
                    size='xs'
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </DocumentFullScreen>
  )
}
