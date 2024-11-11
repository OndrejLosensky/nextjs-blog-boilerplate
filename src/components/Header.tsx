import Link from "next/link";
import { getSession } from "@/lib/sessions";
import { UserMenu } from "./UserMenu";
import { getUser } from "@/lib/utils/getUser";

export async function Header() {
  const session = await getSession();
  const user = session ? await getUser() : null;

  return (
    <header className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              DevBlog
            </Link>
          </div>

          <div className="flex items-center space-x-4">

            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 