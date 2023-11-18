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
  const initialState: AuthState = { authenticated: false, token: null, user: null }
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

        const { token, ...user } = resp
        const authenticated = true

        return authStorage === 'cookies'
          ? setCookie(storeKey, { authenticated, token, user })
          : setAuthState({ authenticated, token, user })
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
