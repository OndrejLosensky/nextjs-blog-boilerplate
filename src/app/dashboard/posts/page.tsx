import { getPosts } from "@/features/Posts/actions"
import { PostsList } from "@/features/Posts/PostsList"
import { Suspense } from "react"
import Link from "next/link"

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="p-8 dark:bg-slate-800 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Posts</h1>
          <Link
            href="/dashboard/posts/add-new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Post
          </Link>
        </div>

        {/* Posts List */}
        <Suspense fallback={<div>Loading posts...</div>}>
          <PostsList initialPosts={posts} />
        </Suspense>
      </div>
    </div>
  )
}