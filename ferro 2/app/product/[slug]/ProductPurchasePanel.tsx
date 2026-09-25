'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/products';

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const price = product.salePrice ?? product.price;

  function handleAddToCart() {
    addItem(
      { slug: product.slug, name: product.name, price, size, image: product.images[0] },
      quantity
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="md:sticky md:top-32 md:self-start">
      <p className="text-xs tracking-wide2 text-graphite mb-2">{product.subcategory}</p>
      <h1 className="font-display text-3xl mb-3">{product.name}</h1>
      <div className="flex items-baseline gap-3 mb-8">
        {product.salePrice && (
          <span className="text-graphite line-through text-sm">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        )}
        <span className={`text-lg ${product.salePrice ? 'text-brass' : ''}`}>
          ₹{price.toLocaleString('en-IN')}
        </span>
      </div>

      <p className="text-sm text-graphite leading-relaxed mb-10 max-w-md">{product.description}</p>

      <div className="mb-8">
        <p className="text-xs tracking-wide2 mb-3">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`px-4 py-2 text-sm border transition-colors ${
                size === s ? 'bg-ink text-paper border-ink' : 'border-hairline hover:border-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs tracking-wide2 mb-3">Quantity</p>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-hairline px-4 py-2 text-sm bg-paper"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full md:w-auto md:min-w-[280px] bg-ink text-paper py-3 px-8 text-sm tracking-wide2 hover:bg-cobalt transition-colors"
      >
        {justAdded ? 'Added to bag' : 'Add to cart'}
      </button>

      <p className="text-xs text-graphite mt-6 max-w-md">
        Ships in 2–4 business days. Free shipping on orders over ₹4,000. Returns accepted within 30 days.
      </p>
    </div>
  );
}
