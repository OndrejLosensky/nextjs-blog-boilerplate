import { getPosts } from "@/features/Posts/actions";
import { Metadata } from "next";
import { HiDocumentText, HiChat, HiHeart } from "react-icons/hi";
import { prisma } from "@/lib/prisma";
import { getSession } from "../../lib/sessions";
import { redirect } from "next/navigation";

// Add formatter function
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Blog statistics and overview",
};

export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const posts = await getPosts();
  const commentCount = await prisma.comment.count({
    where: {
      post: {
        authorId: session.userId 
      }
    }
  });
  const likeCount = await prisma.like.count({
    where: {
      post: {
        authorId: session.userId
      }
    }
  });
  
  return (
    <div className="p-6 dark:bg-slate-800 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-slate-100">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500 dark:text-slate-400">Your Posts</h2>
            <HiDocumentText className="w-5 h-5 text-gray-400 dark:text-slate-500" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{formatNumber(posts.length)}</p>
        </div>

        <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500 dark:text-slate-400">Comments on Your Posts</h2>
            <HiChat className="w-5 h-5 text-gray-400 dark:text-slate-500" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{formatNumber(commentCount)}</p>
        </div>

        <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500 dark:text-slate-400">Likes on Your Posts</h2>
            <HiHeart className="w-5 h-5 text-gray-400 dark:text-slate-500" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{formatNumber(likeCount)}</p>
        </div>
      </div>
    </div>
  );
}