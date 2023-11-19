import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, Card, Text, TextInput, Title } from '@tremor/react'
import { z } from 'zod'

import BrandLogo from '@/assets/images/logo-light.svg'
import { useAuth } from '@/libraries/auth-guard'
import { cn } from '@/utils/ui-helper'
// import { PageWrapper } from '@/components/meta-seo'

const zFormSchema = z.object({
  email: z.string(),
  password: z.string().min(1, 'Password required'),
})

type FormSchema = z.infer<typeof zFormSchema>
type ErrorState = { show: boolean; message: string }

export default function Page() {
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const navigate = useNavigate()

  const resolver = zodResolver(zFormSchema)
  const { setFocus, formState, register, ...frm } = useForm<FormSchema>({ resolver })
  const [errorState, setErrorState] = useState<ErrorState>({ show: false, message: '' })

  const onSubmit: SubmitHandler<FormSchema> = ({ email: username, password }) => {
    const returnTo = searchParams.get('returnTo') || '/-/overview'
    login(username, password)
      .then(() => navigate(returnTo))
      .catch((err) => {
        if (err && err instanceof Error) {
          setErrorState({ show: true, message: err.message })
          console.error(err.message)
        }
      })
      .finally(() => {
        setFocus('email')
        frm.reset()
      })
  }

  return (
    <main>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img src={BrandLogo} className='mx-auto h-10 w-auto' alt='Pingplop' />
        <Title className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </Title>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Callout
          title='Login failed'
          className={cn(errorState.show ? 'block' : 'hidden', 'my-4')}
          icon={ExclamationTriangleIcon}
          color='rose'
        >
          {errorState.show && errorState.message ? errorState.message : null}
        </Callout>

        <Card>
          <form onSubmit={frm.handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <TextInput
                  id='email'
                  type='text'
                  {...register('email')}
                  aria-invalid={formState.errors.email && true}
                  disabled={formState.isSubmitting}
                  autoFocus
                  placeholder='somebody@example.com'
                  autoComplete='email'
                />
                {formState.errors.email && (
                  <Text color='red'>{formState.errors.email.message}</Text>
                )}
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
                  <Link
                    to='/forgot-password'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                    tabIndex={-1}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className='mt-2'>
                <TextInput
                  id='password'
                  type='password'
                  {...register('password')}
                  aria-invalid={formState.errors.password && true}
                  disabled={formState.isSubmitting}
                  placeholder='************'
                  autoComplete='password'
                />
                {formState.errors.email && (
                  <Text color='red'>{formState.errors.email.message}</Text>
                )}
              </div>
            </div>

            <div>
              <Button
                type='submit'
                variant='primary'
                className='w-full'
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
              >
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
