import { AddPostForm } from "@/features/Posts/AddPostForm"
import Link from "next/link"
export default function AddNewPostPage() {
  return (
    <div className="p-8 dark:bg-slate-800 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard/posts"
          className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 mb-8"
        >
          ← Back to all posts
        </Link>

        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-slate-100">Create New Post</h1>
        <AddPostForm />
      </div>
    </div>
  )
} 