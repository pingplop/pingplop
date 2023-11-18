import { cleanup /*, render */ } from '@testing-library/react'

// import { App } from './main'

afterEach(cleanup)

describe('App', () => {
  afterEach(() => {
    localStorage.clear()
  })

  test('empty test without assertions', () => {
    // This is an empty test without any assertions.
    // You can use this as a placeholder for future tests.
    // You can write your test assertions here when you're ready.
  })

  // test('should render successfully', () => {
  //   const { baseElement } = render(<App />)
  //   expect(baseElement).toBeTruthy()
  // })
})
