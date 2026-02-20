import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-display font-bold text-cyan">404</p>
      <h1 className="mt-4 text-h2 font-bold text-white">Page Not Found</h1>
      <p className="mt-3 max-w-md text-body text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan px-8 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
      >
        Back to Home
      </Link>
    </div>
  );
}
