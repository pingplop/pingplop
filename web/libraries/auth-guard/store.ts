import { useLocalStorage } from 'usehooks-ts'

import { apiUrl } from '@/libraries/api-client'

import { AuthState, AuthStorage, LoginResponse } from './context'
import { useCookies } from './hooks'
import { RequestError, sendRequest } from './request'

export interface AuthStoreProps {
  storeKey?: string | undefined
  authStorage?: AuthStorage
}

const DEFAULT_AUTH_STORE_KEY: string = 'auth_state'
const DEFAULT_AUTH_STORAGE: AuthStorage = 'localstorage'

export const useAuthStore = ({
  storeKey = DEFAULT_AUTH_STORE_KEY,
  authStorage = DEFAULT_AUTH_STORAGE,
}: AuthStoreProps) => {
  const initialState: AuthState = {
    authenticated: false,
    access_token: null,
    refresh_token: null,
    user: null,
  }

  const [authState, setAuthState] = useLocalStorage<AuthState>(storeKey, initialState)
  const [cookies, setCookie, removeCookie] = useCookies([storeKey])

  const currentSession: AuthState =
    authStorage === 'cookies' ? (cookies[storeKey] as AuthState) : authState

  return {
    ...currentSession,
    login: async (username: string, password: string): Promise<void> => {
      try {
        const body: BodyInit = JSON.stringify({ username, password })
        const request = new Request(apiUrl('AUTH_LOGIN'), { method: 'POST', body })
        const resp = await sendRequest<LoginResponse>(request)

        const { access_token, refresh_token, ...user } = resp
        const authenticated = access_token !== ''

        if (authStorage === 'cookies') {
          setCookie('access_token', resp.access_token)
          setCookie('authenticated', authenticated)
          setCookie('user_data', user)
          // TODO put each value into separated cookies key
          setCookie(storeKey, { authenticated, access_token, refresh_token, user })
          return
        }
        return setAuthState({ authenticated, access_token, refresh_token, user })
      } catch (error) {
        // Handle specific fetch-related errors
        if (error instanceof RequestError) {
          throw new Error(error.message)
        }
        // Handle other errors
        throw error
      }
    },

    logout: async (): Promise<void> => {
      try {
        // Add logic to clear authentication on the server if necessary
        if (authStorage === 'cookies') {
          removeCookie(storeKey)
        }
        setAuthState(initialState)
        localStorage.removeItem(storeKey)
      } catch (error) {
        console.error('Logout failed:', error)
        throw error
      }
    },
  }
}
