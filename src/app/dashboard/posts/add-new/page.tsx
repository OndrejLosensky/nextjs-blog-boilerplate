import { AddPostForm } from "@/features/Posts/AddPostForm"

export default function AddNewPostPage() {
  return (
    <div className="p-8 dark:bg-slate-800 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-slate-100">Create New Post</h1>
        <AddPostForm />
      </div>
    </div>
  )
} 