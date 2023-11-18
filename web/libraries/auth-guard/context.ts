import React from 'react'
import Cookies from 'universal-cookie'

export type AuthStorage = 'localstorage' | 'cookies'

export type LoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export interface AuthState {
  authenticated: boolean
  token: string | null
  user: Omit<LoginResponse, 'token'> | null
}

export interface AuthActions {
  login: (username: string, password: string, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
}

type ContextProps = AuthState & AuthActions

const CookiesContext = React.createContext(new Cookies())

const AuthContext = React.createContext<ContextProps | undefined>(undefined)

export { AuthContext, type ContextProps, CookiesContext }
