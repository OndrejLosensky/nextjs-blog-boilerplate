'use client'

import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  loadingText?: string
  defaultText: string
  className?: string
}

export function SubmitButton({ 
  loadingText = 'Submitting...', 
  defaultText, 
  className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
    >
      {pending ? loadingText : defaultText}
    </button>
  )
} 