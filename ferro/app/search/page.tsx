'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="pt-40 pb-24 px-6 md:px-10 max-w-6xl mx-auto">
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        className="w-full border-b border-hairline bg-transparent pb-4 text-2xl font-display outline-none placeholder:text-graphite/60"
      />
      {query && (
        <p className="text-xs text-graphite mt-4 mb-8">{results.length} results</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 mt-8">
        {results.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
