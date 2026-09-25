'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQuantity, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-500 ease-cinematic ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-paper text-ink shadow-2xl transition-transform duration-500 ease-cinematic flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-hairline">
          <h2 className="font-display text-lg">Your bag</h2>
          <button type="button" onClick={closeCart} className="text-sm hover:opacity-60" aria-label="Close cart">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-graphite text-sm mt-8">Your bag is empty. Add something you&rsquo;ll actually wear.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="flex gap-4">
                  <div className="relative w-20 h-24 shrink-0 bg-hairline/40">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-graphite mt-0.5">Size {item.size}</p>
                      </div>
                      <p className="text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <label className="flex items-center gap-2">
                        Qty
                        <select
                          value={item.quantity}
                          onChange={(e) => setQuantity(item.slug, item.size, Number(e.target.value))}
                          className="border border-hairline bg-paper px-2 py-1"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-graphite hover:text-ink underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-hairline px-6 py-6">
          <div className="flex justify-between text-sm mb-4">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="w-full bg-ink text-paper py-3 text-sm tracking-wide2 disabled:opacity-40 hover:bg-cobalt transition-colors"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
