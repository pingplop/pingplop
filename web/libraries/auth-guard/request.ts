import { isInBrowser } from './hooks'

export function authorizationHeader(type: 'bearer' | 'basic', token: string): string {
  if (type === 'basic') {
    return ['Basic', token].join(' ')
  }
  if (type === 'bearer') {
    return ['Bearer', token].join(' ')
  }
  throw new TypeError('Invalid token type')
}

/**
 * Example usage:
 *   const request = new Request("https://www.googleapis.com/oauth2/v3/userinfo", {});
 *   const authHeader = authorizationHeader('bearer', 'eyJ0xxxxxxxxxxxxxxxxxxxxxx');
 *   request.headers.set("Authorization", authHeader);
 *   return await sendRequest<GoogleUser>(request);
 */

export async function sendRequest<T extends object>(request: Request): Promise<T> {
  const userAgentHash = isInBrowser() ? 'OK' : 'BAD'

  request.headers.set('Accept', 'application/json')
  request.headers.set('Content-Type', 'application/json')
  request.headers.set('X-User-Agent-Hash', userAgentHash)

  const response = await fetch(request)

  if (!response.ok) {
    throw new RequestError(request, response)
  }

  return await response.json()
}

export class RequestError extends Error {
  public request: Request
  public response: Response
  constructor(request: Request, response: Response) {
    super('Request failed')
    this.request = request
    this.response = response
  }
}
