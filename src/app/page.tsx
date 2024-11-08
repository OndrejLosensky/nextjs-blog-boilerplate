import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.webp"
                alt="Blog Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">DevBlog</span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/blog" className="hover:text-gray-600">Blog</Link>
              <Link href="/categories" className="hover:text-gray-600">Categories</Link>
              <Link href="/about" className="hover:text-gray-600">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Post</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Image
              src="/placeholder.webp"
              alt="Featured post thumbnail"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
            <div className="flex flex-col justify-center">
              <span className="text-indigo-600 font-semibold mb-2">TECHNOLOGY</span>
              <h3 className="text-2xl font-bold mb-4">Understanding Modern Web Architecture</h3>
              <p className="text-gray-600 mb-4">
                Deep dive into the latest web development patterns and best practices for building scalable applications...
              </p>
              <Link 
                href="/blog/understanding-web-architecture"
                className="text-indigo-600 hover:text-indigo-500 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <article key={post} className="border border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={`/placeholder.webp`}
                  alt={`Post ${post} thumbnail`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-indigo-600 font-semibold">DEVELOPMENT</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">Essential Developer Tools for 2024</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the most powerful tools that every developer should have in their toolkit...
                  </p>
                  <Link 
                    href={`/blog/post-${post}`}
                    className="text-indigo-600 hover:text-indigo-500 font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['JavaScript', 'React', 'Node.js', 'DevOps'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
              >
                <h3 className="font-semibold">{category}</h3>
                <p className="text-sm text-gray-600 mt-2">12 articles</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
            </div>
            <p className="text-gray-600">© 2024 DevBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
