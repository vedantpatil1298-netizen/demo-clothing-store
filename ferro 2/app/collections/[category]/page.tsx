import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getProductsByCategory } from '@/lib/products';
import ProductGrid from './ProductGrid';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default function CollectionPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/"
          aria-label="Back to home"
          className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-sm hover:bg-ink hover:text-paper transition-colors"
        >
          ←
        </Link>
        <h1 className="font-display text-2xl md:text-3xl">{category.label}</h1>
        <span className="w-9" aria-hidden="true" />
      </div>

      <ProductGrid products={products} subcategories={category.subcategories as unknown as string[]} />
    </div>
  );
}
