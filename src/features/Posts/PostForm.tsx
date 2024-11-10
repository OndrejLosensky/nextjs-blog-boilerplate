"use client"

import { useRef, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { createPost, updatePost } from './actions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type PostFormProps = {
  post?: {
    id: string
    title: string
    content: string
    published: boolean
    imagePath: string | null
  }
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(post?.imagePath || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = post 
      ? await updatePost(post.id, formData)
      : await createPost(formData)
    
    if (result.success) {
      formRef.current?.reset()
      setPreview(null)
      router.refresh()
      if (post) {
        router.push('/dashboard/posts')
      }
    } else if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-slate-100">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>
      
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
              defaultValue={post?.title}
              className="mt-1 block py-2 px-4 w-full rounded-md bg-neutral-100 border dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Featured Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 dark:text-slate-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                dark:file:bg-slate-800 dark:file:text-blue-400
                hover:file:bg-blue-100 dark:hover:file:bg-slate-700"
            />
          </div>

          {preview && (
            <div className="relative w-full h-48">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Content
            </label>
            <textarea
              name="content"
              required
              defaultValue={post?.content}
              rows={6}
              className="mt-1 block py-2 px-4 w-full rounded-md bg-neutral-100 border dark:border-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              defaultChecked={post?.published}
              className="rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm text-gray-700 dark:text-slate-300">
              Publish immediately
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard/posts')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <SubmitButton
              defaultText={post ? "Update Post" : "Create Post"}
              loadingText={post ? "Updating..." : "Creating..."}
              className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700"
            />
          </div>
        </div>
      </form>
    </div>
  )
} 