import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/features/Posts/actions";
import { formatDistanceToNow } from "date-fns";
import { HiChat } from "react-icons/hi";
import { getSession } from "@/lib/sessions";
import { LikeButton } from "@/features/Likes/LikeButton";
import { Header } from "@/components/Header";

type PublishedPost = {
  id: string;
  title: string;
  content: string;
  slug: string;
  imagePath: string | null;
  createdAt: Date;
  author: {
    name: string | null;
    email: string;
  };
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
};

export default async function Home() {
  const posts = await getPublishedPosts();
  const session = await getSession();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest Posts</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post: PublishedPost) => (
            <article 
              key={post.id} 
              className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/posts/${post.slug}`}>
                <Image
                  src={post.imagePath || "/placeholder.webp"}
                  alt={`${post.title} thumbnail`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                      {post.author.name || 'ANONYMOUS'}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-gray-500 dark:text-slate-400">
                        <HiChat className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.commentCount}</span>
                      </div>
                      <LikeButton 
                        postId={post.id}
                        initialLikeCount={post.likeCount}
                        initialIsLiked={post.isLiked}
                        isLoggedIn={!!session}
                      />
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300 line-clamp-3">
                    {post.content}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-slate-400">
            No posts available yet.
          </p>
        )}
      </main>
    </div>
  );
}
