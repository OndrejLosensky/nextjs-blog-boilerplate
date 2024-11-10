import { PostForm } from "@/features/Posts/PostForm"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/sessions"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      imagePath: true,
      authorId: true,
    },
  })

  if (!post || post.authorId !== session.userId) {
    notFound()
  }

  return (
    <div className="p-8 dark:bg-slate-800 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard/posts"
          className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 mb-8"
        >
          ← Back to all posts
        </Link>

        <PostForm post={post} />
      </div>
    </div>
  )
}