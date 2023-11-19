type ConfigKey = 'API_BASE_URL' | 'DATABASE_URL'

const configKeys: Record<ConfigKey, string> = {
  API_BASE_URL: import.meta.env['VITE_API_BASE_URL'] || '/api',
  DATABASE_URL: import.meta.env['VITE_DATABASE_URL'] ?? '',
}

export default function config(key: ConfigKey): string {
  return configKeys[key]
}
