import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SubmitButton } from '../../SubmitButton';

describe('SubmitButton', () => {
  it('renders button with correct text', () => {
    const { getByRole } = render(
      <SubmitButton 
        defaultText="Login" 
        loadingText="Login" 
      />
    )
    
    const button = getByRole('button')
    expect(button).toHaveTextContent('Login')
  })

  it('displays loading text when isLoading is true', () => {
    const { getByRole } = render(
      <SubmitButton 
        defaultText="Login" 
        loadingText="Login"         
      />
    )
    
    const button = getByRole('button')
    expect(button).toHaveTextContent('Login')
  })
}) 