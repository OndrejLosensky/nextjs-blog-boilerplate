'use client'

import { useRef, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { createPost } from './actions'
import { useRouter } from 'next/navigation'

export function AddPostForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await createPost(formData)
    
    if (result.success) {
      formRef.current?.reset()
      router.refresh()
    } else if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-slate-100">Create New Post</h2>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <form className="w-full" ref={formRef} action={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Content
            </label>
            <textarea
              name="content"
              required
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              className="rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm text-gray-700 dark:text-slate-300">
              Publish immediately
            </label>
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
              defaultText="Create Post"
              loadingText="Creating..."
              className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700"
            />
          </div>
        </div>
      </form>
    </div>
  )
}