import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="w-full max-w-3xl flex flex-col items-center gap-8">
        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Learning Fun
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <Link
            href="/typing"
            className="group rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-105 text-center"
          >
            <div className="text-6xl mb-4">keyboard</div>
            <h2 className="text-2xl font-bold text-indigo-900 group-hover:text-purple-600 transition-colors">
              Jacob&apos;s Chinese Typing
            </h2>
            <p className="mt-2 text-gray-500">
              Practice typing Chinese characters
            </p>
          </Link>

          <Link
            href="/math"
            className="group rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-8 border-2 border-green-200 hover:border-green-400 transition-all hover:scale-105 text-center"
          >
            <div className="text-6xl mb-4">calculate</div>
            <h2 className="text-2xl font-bold text-indigo-900 group-hover:text-green-600 transition-colors">
              Chelsea&apos;s Math Practice
            </h2>
            <p className="mt-2 text-gray-500">
              Practice math problems
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
