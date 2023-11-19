import config from '@/utils/config'

type Endpoint = 'AUTH_LOGIN' | 'AUTH_LOGOUT'

const API_BASE_URL = config('API_BASE_URL')

const endpointUrls: Record<Endpoint, string> = {
  AUTH_LOGIN: '/auth/token',
  AUTH_LOGOUT: '/auth/logout',
}

export function apiUrl(endpoint?: Endpoint): string {
  return endpoint ? `${API_BASE_URL}${endpointUrls[endpoint]}` : API_BASE_URL
}
