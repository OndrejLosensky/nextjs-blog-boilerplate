import { getPostBySlug } from "@/features/Posts/actions";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 mb-8"
        >
          ← Back to posts
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

          <div className="mt-8">
            <Image
              src="/placeholder.webp"
              alt={post.title}
              width={1200}
              height={600}
              className="rounded-lg object-cover w-full aspect-video"
              priority
            />
          </div>

          <div className="mt-8 text-gray-700 dark:text-slate-300 leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}