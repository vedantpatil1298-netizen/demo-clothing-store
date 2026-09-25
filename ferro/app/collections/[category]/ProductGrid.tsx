'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/products';

type SortKey = 'featured' | 'price-asc' | 'price-desc';

export default function ProductGrid({
  products,
  subcategories
}: {
  products: Product[];
  subcategories: string[];
}) {
  const [filter, setFilter] = useState<string | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const visible = useMemo(() => {
    let list = filter === 'all' ? products : products.filter((p) => p.subcategory === filter);
    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === 'price-desc') list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    return list;
  }, [products, filter, sort]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8 relative">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setFilterOpen((v) => !v);
              setSortOpen(false);
            }}
            className="rounded-full border border-hairline px-4 py-2 text-sm hover:border-ink transition-colors"
          >
            {filter === 'all' ? 'Filter' : filter}
          </button>
          {filterOpen && (
            <ul className="absolute z-10 mt-2 w-44 bg-paper border border-hairline text-sm py-1">
              <li>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-hairline/30"
                  onClick={() => {
                    setFilter('all');
                    setFilterOpen(false);
                  }}
                >
                  All
                </button>
              </li>
              {subcategories.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-hairline/30"
                    onClick={() => {
                      setFilter(s);
                      setFilterOpen(false);
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setSortOpen((v) => !v);
              setFilterOpen(false);
            }}
            className="rounded-full border border-hairline px-4 py-2 text-sm hover:border-ink transition-colors"
          >
            Sort
          </button>
          {sortOpen && (
            <ul className="absolute z-10 mt-2 w-44 bg-paper border border-hairline text-sm py-1">
              {[
                { key: 'featured', label: 'Featured' },
                { key: 'price-asc', label: 'Price: low to high' },
                { key: 'price-desc', label: 'Price: high to low' }
              ].map((opt) => (
                <li key={opt.key}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-hairline/30"
                    onClick={() => {
                      setSort(opt.key as SortKey);
                      setSortOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="ml-auto text-xs text-graphite">{visible.length} items</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
