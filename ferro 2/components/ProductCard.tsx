'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-[4/5] bg-hairline/40 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-500 ease-cinematic ${
            hovered && product.images[1] ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-500 ease-cinematic ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {product.salePrice && (
          <span className="absolute top-3 left-3 bg-paper px-2 py-1 text-[11px] tracking-wide2 text-brass">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between text-sm">
        <span>{product.name}</span>
        <span className="flex items-baseline gap-2">
          {product.salePrice && (
            <span className="text-graphite line-through text-xs">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
          <span className={product.salePrice ? 'text-brass' : ''}>
            ₹{(product.salePrice ?? product.price).toLocaleString('en-IN')}
          </span>
        </span>
      </div>
    </Link>
  );
}
