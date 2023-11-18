import React from 'react'
import Cookies, { type Cookie, type CookieSetOptions } from 'universal-cookie'

import { AuthContext, CookiesContext } from './context'
import { type AuthStoreProps, useAuthStore } from './store'

export interface ReactCookieProps {
  cookies?: Cookies
  cookiesOptions?: CookieSetOptions
  allCookies?: { [name: string]: Cookie }
  children: React.ReactNode
  ref?: React.RefObject<object>
}

export interface AuthProviderProps extends ReactCookieProps, AuthStoreProps {}

export function AuthProvider({
  authStorage = 'localstorage',
  ...props
}: AuthProviderProps): JSX.Element {
  const authStore = useAuthStore({ authStorage, ...props })

  const AuthProviderComponent = () => (
    <AuthContext.Provider value={authStore}>{props.children}</AuthContext.Provider>
  )

  if (authStorage === 'cookies') {
    /** @ref: https://github.com/bendotcodes/cookies/tree/main/packages/react-cookie#withcookiescomponent */
    // withCookies(AuthProviderComponent)
    const cookiesInstance = new Cookies(undefined, props.cookiesOptions)
    return (
      <CookiesContext.Provider value={props.cookies ? props.cookies : cookiesInstance}>
        <AuthContext.Provider value={authStore}>{props.children}</AuthContext.Provider>
      </CookiesContext.Provider>
    )
  }

  return <AuthProviderComponent />
}
