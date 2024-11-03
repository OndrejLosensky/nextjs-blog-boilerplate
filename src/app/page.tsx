import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-10 pb-20 gap-20 sm:p-24 font-sans">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-5xl font-bold">
          NEXT.js Boilerplate
        </h1>
        <p className="text-lg font-light text-gray-600">
          A boilerplate for starting a new project with Next.js.
        </p>
        <div className="flex gap-4 mt-8 items-center flex-col sm:flex-row">
          <Link
            href="/login"
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-gray-800 dark:hover:bg-gray-300 text-sm sm:text-base h-12 px-6 sm:px-8"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Get started
          </Link>
          <Link
            href="/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-white hover:border-transparent text-sm sm:text-base h-12 px-6 sm:px-8"
          >
            Read the Docs
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-8 flex-wrap items-center justify-center text-gray-600">
        <Link
          href="/features"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Features
        </Link>
        <Link
          href="https://github.com/OndrejLosensky"          
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          GitHub
        </Link>
        <Link
          href="https://losensky.tech"
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Check out my portfolio →
        </Link>
      </footer>
    </div>
  );
}
