import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Reset all mocks automatically between tests
beforeEach(() => {
  jest.clearAllMocks()
})

// Optional: Set default timeout for tests
jest.setTimeout(10000) 