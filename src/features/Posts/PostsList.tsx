'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { updatePostStatus, deletePost } from './actions'
import Image from 'next/image'
import Link from 'next/link'

type PostWithAuthor = {
  id: string
  title: string
  slug: string
  content: string
  imagePath: string | null
  published: boolean
  authorId: string
  createdAt: Date
  updatedAt: Date
  author: {
    name: string | null
    email: string
  }
}

interface PostsListProps {
  initialPosts: PostWithAuthor[]
}

export function PostsList({ initialPosts }: PostsListProps) {
  const [posts, setPosts] = useState(initialPosts)

  const handleStatusToggle = async (postId: string, newStatus: boolean) => {
    const result = await updatePostStatus(postId, newStatus)
    if (result.success) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, published: newStatus } : post
      ))
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    const result = await deletePost(postId)
    if (result.success) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-slate-100">Your Posts</h2>
        
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-slate-400">No posts yet. Create your first post above!</p>
          ) : (
            posts.map((post) => (
              <article 
                key={post.id} 
                className="border dark:border-slate-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex gap-4">
                  {post.imagePath && (
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={post.imagePath}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                          {formatDistanceToNow(new Date(post.createdAt))} ago
                          {post.author.name && ` • by ${post.author.name}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStatusToggle(post.id, !post.published)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            post.published
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                        <Link
                          href={`/dashboard/posts/edit/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-slate-300 line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 