import { Link } from 'react-router-dom'
import { Button, Card, Text, TextInput, Title } from '@tremor/react'

import BrandLogo from '@/assets/images/logo-light.svg'

export default function LoginPage() {
  return (
    <main>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img src={BrandLogo} className='mx-auto h-10 w-auto' alt='Pingplop' />
        <Title className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </Title>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Card>
          <form className='space-y-6' action='#' method='POST'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <TextInput
                  id='email'
                  name='email'
                  type='email'
                  placeholder='somebody@example.com'
                  autoComplete='email'
                  required
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <TextInput
                  id='password'
                  name='password'
                  type='password'
                  placeholder='************'
                  required
                />
              </div>
            </div>

            <div>
              <Button type='submit' variant='primary' className='w-full'>
                Continue
              </Button>
            </div>
          </form>
        </Card>

        <Text className='mt-10 text-center text-gray-500'>
          Not a member?{' '}
          <Link
            to='/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Create an account
          </Link>
        </Text>
      </div>
    </main>
  )
}
