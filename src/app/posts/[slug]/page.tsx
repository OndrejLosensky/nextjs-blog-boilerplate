import { getPostBySlug } from "@/features/Posts/actions";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CommentForm } from "@/features/Comments/CommentForm";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/sessions";

type PageProps = {
  params: { slug: string }
}

export default async function PostPage({
  params,
}: PageProps) {
  const post = await getPostBySlug(params.slug);
  const session = await getSession();

  if (!post) {
    notFound();
  }

  const comments = post.id ? await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  }) : [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 mb-8"
        >
          ← Back to all posts
        </Link>

        <article className="prose dark:prose-invert lg:prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400">
            <span>By {post.author.name || 'Anonymous'}</span>
            <span>•</span>
            <time>{formatDistanceToNow(new Date(post.createdAt))} ago</time>
          </div>

          {post.imagePath && (
            <div className="mt-8">
              <Image
                src={post.imagePath}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          )}

          <div className="mt-8 text-gray-700 dark:text-slate-300 leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-16 border-t dark:border-slate-800 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Comments ({comments.length})
          </h2>

          {session ? (
            <CommentForm postId={post.id} slug={params.slug} />
          ) : (
            <div className="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-lg mb-8">
              <p className="text-blue-700 dark:text-blue-400">
                Please{' '}
                <Link 
                  href="/login" 
                  className="font-semibold underline hover:text-blue-600 dark:hover:text-blue-300"
                >
                  sign in
                </Link>{' '}
                to leave a comment.
              </p>
            </div>
          )}

          <div className="mt-8 space-y-8">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.author.name || 'Anonymous'}
                    </span>
                    <span className="text-gray-500 dark:text-slate-400">
                      {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-slate-300">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}