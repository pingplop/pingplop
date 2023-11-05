import { cleanup /*, render, waitFor */ } from '@testing-library/react'

// import App from './app'

afterEach(cleanup)

describe('App', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('Empty test without assertions', () => {
    // This is an empty test without any assertions.
    // You can use this as a placeholder for future tests.
    // You can write your test assertions here when you're ready.
  })

  // TODO create a real test
  // it('redirects to /login when not authenticated', async () => {
  //   render(<App />)
  //   // Wait for the component to render and redirect if not authenticated
  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/login')
  //   })
  // })
})
