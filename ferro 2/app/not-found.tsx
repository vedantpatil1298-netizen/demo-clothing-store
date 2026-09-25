import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-40 pb-24 px-6 text-center">
      <h1 className="font-display text-3xl mb-4">Page not found</h1>
      <p className="text-graphite mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/" className="underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
