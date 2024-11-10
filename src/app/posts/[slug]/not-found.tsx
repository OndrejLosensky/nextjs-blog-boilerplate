import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Post Not Found
        </h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">
          The post you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
} 