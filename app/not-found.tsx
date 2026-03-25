import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-24">
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-sm text-gray-600">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
