import type { FC, ReactNode, Ref } from 'react'
import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import type { Cookie, CookieSetOptions } from 'universal-cookie'

import { AuthContext, type ContextProps, CookiesContext } from './context'
import type { ReactCookieProps } from './provider'

export const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const isInBrowser = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  )
}

export function useCookies<T extends string, U = { [K in T]?: unknown }>(
  dependencies?: T[]
): [
  U,
  (name: T, value: Cookie, options?: CookieSetOptions) => void,
  (name: T, options?: CookieSetOptions) => void,
  () => void,
] {
  const cookies = useContext(CookiesContext)
  if (!cookies) {
    throw new Error('Missing <CookiesProvider>')
  }

  const [allCookies, setCookies] = useState(() => cookies.getAll())

  if (isInBrowser()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      function onChange() {
        const newCookies = cookies.getAll({
          doNotUpdate: true,
        })

        if (shouldUpdate(dependencies || null, newCookies, allCookies)) {
          setCookies(newCookies)
        }
      }

      cookies.addChangeListener(onChange)

      return () => {
        cookies.removeChangeListener(onChange)
      }
    }, [cookies, allCookies])
  }

  const setCookie = useMemo(() => cookies.set.bind(cookies), [cookies])
  const removeCookie = useMemo(() => cookies.remove.bind(cookies), [cookies])
  const updateCookies = useMemo(() => cookies.update.bind(cookies), [cookies])

  return [allCookies, setCookie, removeCookie, updateCookies]
}

function shouldUpdate<U = { [K: string]: unknown }>(
  dependencies: Array<keyof U> | null,
  newCookies: U,
  oldCookies: U
) {
  if (!dependencies) {
    return true
  }

  for (const dependency of dependencies) {
    if (newCookies[dependency] !== oldCookies[dependency]) {
      return true
    }
  }

  return false
}

type WithCookiesProps<T> = T & { forwardedRef?: Ref<unknown>; children?: ReactNode }

export const withCookies = <T extends ReactCookieProps>(
  WrappedComponent: React.ComponentType<T>
): React.FC<WithCookiesProps<T>> => {
  const CookieWrapperComponent: FC<WithCookiesProps<T>> = (props) => {
    const { forwardedRef, ...restProps } = props
    const cookies = useContext(CookiesContext)
    const allCookies = cookies.getAll()

    useEffect(() => {
      const onChange = () => {
        // Make sure to update children with new values
        // This is similar to this.forceUpdate() in class components
      }

      cookies.addChangeListener(onChange)

      return () => {
        // Cleanup effect
        cookies.removeChangeListener(onChange)
      }
    }, [cookies]) // Run effect when `cookies` changes

    return (
      <WrappedComponent
        {...(restProps as T)}
        ref={forwardedRef}
        cookies={cookies}
        allCookies={allCookies}
      />
    )
  }

  return CookieWrapperComponent
}
