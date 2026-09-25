import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, products } from '@/lib/products';
import ProductPurchasePanel from './ProductPurchasePanel';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-6xl mx-auto">
      <Link
        href={`/collections/${product.category}`}
        aria-label="Back to collection"
        className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-sm hover:bg-ink hover:text-paper transition-colors mb-8"
      >
        ←
      </Link>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="flex flex-col gap-4">
          {product.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${product.name} — view ${i + 1}`}
              className="w-full aspect-[4/5] object-cover bg-hairline/40"
            />
          ))}
        </div>

        <ProductPurchasePanel product={product} />
      </div>
    </div>
  );
}
