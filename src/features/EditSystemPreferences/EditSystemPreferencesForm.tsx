'use client'

import { useRef, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { updateSystemPreferences } from './actions'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/context/theme-provider'
import { User } from '@/lib/types'

export function EditSystemPreferencesForm({ user }: { user: User }) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  const currentTheme = user.theme || 'light'

  async function handleSubmit(formData: FormData) {
    setError(null)
    const themeValue = formData.get('theme')
    
    if (!themeValue) {
      setError('Theme selection is required')
      return
    }
    
    try {
      const result = await updateSystemPreferences({ theme: themeValue.toString() })
      
      if (result.success) {
        if (themeValue.toString() !== theme) {
          toggleTheme()
        }
        router.refresh()
      } else if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError(`Failed to update preferences: ${(err as Error).message}`)
    }
  }

  return (
    <div className="mx-auto bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-slate-100">System Preferences</h1>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <form ref={formRef} action={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Theme Preference
            </label>
            <select
              name="theme"
              defaultValue={currentTheme}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => formRef.current?.reset()}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              Reset
            </button>
            <SubmitButton
              defaultText="Update Preferences"
              loadingText="Updating..."
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
