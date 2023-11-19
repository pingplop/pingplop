import React from 'react'
import Cookies from 'universal-cookie'

export type AuthStorage = 'localstorage' | 'cookies'

export type LoginResponse = {
  access_token: string
  expires_at: number
  refresh_token: string
  user: {
    id: string
    email: string
    first_name: string
    last_name: string
    preferred_username: string
    avatar_url: string
    metadata: object
    email_confirmed_at: number
    banned_until: number
    created_at: number
    updated_at: number
  }
  user_id: string
}

export interface AuthState {
  authenticated: boolean
  access_token: string | null
  refresh_token: string | null
  user: Omit<LoginResponse, 'access_token' | 'refresh_token'> | null
}

export interface AuthActions {
  login: (username: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
}

type ContextProps = AuthState & AuthActions

const CookiesContext = React.createContext(new Cookies())

const AuthContext = React.createContext<ContextProps | undefined>(undefined)

export { AuthContext, type ContextProps, CookiesContext }
