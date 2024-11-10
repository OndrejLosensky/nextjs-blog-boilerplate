'use client'

import { useRef, useState } from 'react'
import { createComment } from './actions'
import { SubmitButton } from '@/components/SubmitButton'

interface CommentFormProps {
  postId: string
  slug: string
}

export function CommentForm({ postId, slug }: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await createComment(formData)
    
    if (result.success) {
      formRef.current?.reset()
    } else if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Leave a Comment</h3>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <form ref={formRef} action={handleSubmit}>
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="slug" value={slug} />
        
        <textarea
          name="content"
          required
          rows={4}
          className="mt-1 p-4 block w-full rounded-md bg-neutral-100 border dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Write your comment..."
        />

        <div className="mt-4">
          <SubmitButton
            defaultText="Post Comment"
            loadingText="Posting..."
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700"
          />
        </div>
      </form>
    </div>
  )
} 