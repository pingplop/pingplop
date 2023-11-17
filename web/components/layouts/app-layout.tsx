import { Fragment, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  BoltIcon,
  ChartBarSquareIcon,
  CursorArrowRippleIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import BrandLogo from '@/assets/images/logo-light.svg'
import { cn } from '@/utils/ui-helper'

import { EmptySlot } from '../common'

const navigation = [
  { name: 'Overview', href: '/overview', icon: ChartBarSquareIcon },
  { name: 'Monitors', href: '/monitors', icon: BoltIcon },
  { name: 'Heartbeat', href: '/heartbeat', icon: HeartIcon },
  { name: 'Incidents', href: '/incidents', icon: ExclamationTriangleIcon, count: '5' },
  { name: 'Status Page', href: '/status-page', icon: PresentationChartLineIcon },
  { name: 'Integrations', href: '/integrations', icon: CursorArrowRippleIcon },
]
const teams = [
  { id: 1, name: 'Billing & Invoices', href: '/account/billing', initial: 'B' },
  {
    id: 2,
    name: 'Help & Support',
    href: 'https://pingplop.mintlify.app/introduction',
    initial: 'H',
    newTab: true,
  },
]
const userNavigation = [
  { name: 'Your account', href: '#' },
  { name: 'Sign out', href: '/login' },
]

export function AppLayout() {
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sideOverOpen, setSideOverOpen] = useState(false)

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/80' />
          </Transition.Child>

          <div className='fixed inset-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                    <button
                      type='button'
                      className='-m-2.5 p-2.5'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10'>
                  <div className='flex h-16 shrink-0 items-center'>
                    <img src={BrandLogo} className='h-8 w-auto' alt='Pingplop' />
                  </div>
                  <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                      <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={cn(
                                  pathname === item.href
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                )}
                              >
                                <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                                {item.name}
                                {item.count ? (
                                  <span
                                    className='ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700'
                                    aria-hidden='true'
                                  >
                                    {item.count}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className='text-xs font-semibold leading-6 text-gray-400'>
                          Your teams
                        </div>
                        <ul role='list' className='-mx-2 mt-2 space-y-1'>
                          {teams.map((team) => (
                            <li key={team.name}>
                              <Link
                                to={team.href}
                                className={cn(
                                  pathname === team.href
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                )}
                                target={team.newTab ? '_blank' : '_self'}
                                rel='noopener noreferrer'
                              >
                                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                                  {team.initial}
                                </span>
                                <span className='truncate'>{team.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className='mt-auto'>
                        <Link
                          to='#'
                          className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'
                        >
                          <UserGroupIcon className='h-6 w-6 shrink-0' aria-hidden='true' />
                          Team Settings
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4'>
          <div className='flex h-16 shrink-0 items-center'>
            <img src={BrandLogo} className='h-9 w-auto' alt='Pingplop' />
          </div>
          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul role='list' className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          pathname === item.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                        )}
                      >
                        <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                        {item.name}
                        {item.count ? (
                          <span
                            className='ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700'
                            aria-hidden='true'
                          >
                            {item.count}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className='text-xs font-semibold leading-6 text-gray-400'>Your teams</div>
                <ul role='list' className='-mx-2 mt-2 space-y-1'>
                  {teams.map((team) => (
                    <li key={team.name}>
                      <Link
                        to={team.href}
                        className={cn(
                          pathname === team.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                        )}
                        target={team.newTab ? '_blank' : '_self'}
                        rel='noopener noreferrer'
                      >
                        <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                          {team.initial}
                        </span>
                        <span className='truncate'>{team.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='mt-auto'>
                <Link
                  to='#'
                  className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'
                >
                  <UserGroupIcon className='h-6 w-6 shrink-0' aria-hidden='true' />
                  Team Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='lg:pl-72'>
        {/* bg-white border-b border-gray-200 shadow-sm */}
        <div className='sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8'>
          <button
            type='button'
            className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>

          {/* Separator */}
          <div className='h-6 w-px bg-gray-900/10 lg:hidden' aria-hidden='true' />

          <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
            <div className='relative flex flex-1'>{/* Put search form or breadcrumbs here */}</div>
            <div className='flex items-center gap-x-4 lg:gap-x-6'>
              <button
                type='button'
                className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
                onClick={() => setSideOverOpen(!sideOverOpen)}
              >
                <span className='sr-only'>View notifications</span>
                <BellIcon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Separator */}
              <div
                className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
                aria-hidden='true'
              />

              {/* Profile dropdown */}
              <Menu as='div' className='relative'>
                <Menu.Button className='-m-1.5 flex items-center p-1.5'>
                  <span className='sr-only'>Open user menu</span>
                  <img
                    src='https://avatars.githubusercontent.com/u/921834?v=4'
                    className='h-8 w-8 rounded-full bg-gray-50'
                    alt='Avatar'
                  />
                  <span className='hidden lg:flex lg:items-center'>
                    <span
                      className='ml-4 text-sm font-semibold leading-6 text-gray-900'
                      aria-hidden='true'
                    >
                      Aris Ripandi
                    </span>
                    <ChevronDownIcon className='ml-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={cn(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className='py-4 lg:py-8'>
          <div className='px-4 sm:px-8 lg:px-10'>
            <Outlet />
          </div>
        </main>

        {/* Sidebar over / drawer */}
        <Transition.Root show={sideOverOpen} as={Fragment}>
          <Dialog as='div' className='relative z-30' onClose={setSideOverOpen}>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>
            <div className='fixed inset-0 overflow-hidden'>
              <div className='absolute inset-0 overflow-hidden'>
                <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                  <Transition.Child
                    as={Fragment}
                    enter='transform transition ease-in-out duration-500 sm:duration-700'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transform transition ease-in-out duration-500 sm:duration-700'
                    leaveFrom='translate-x-0'
                    leaveTo='translate-x-full'
                  >
                    <Dialog.Panel className='pointer-events-auto w-screen max-w-xl'>
                      <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                        <div className='px-4 sm:px-6'>
                          <div className='flex items-start justify-between'>
                            <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                              Notifications
                            </Dialog.Title>
                            <div className='ml-3 flex h-7 items-center'>
                              <button
                                type='button'
                                className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                onClick={() => setSideOverOpen(!sideOverOpen)}
                              >
                                <span className='absolute -inset-2.5' />
                                <span className='sr-only'>Close panel</span>
                                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                          {/* Your content */}
                          <EmptySlot className='h-full' />
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  )
}
